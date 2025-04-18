import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { response } from 'src/common/types';
import { MailService } from 'src/mail/mail.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminAddTeacherDto } from './dto';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { generateIdentity } from 'src/common/decorators/generate-id';

@Injectable()
export class TeacherService {
  constructor(
    private Prisma: PrismaService,
    private MailService: MailService,
  ) {}

  async registerTeacher(dto: AdminAddTeacherDto): Promise<response> {
    // Check if email or teamsId already exist
    const existingUser = await this.Prisma.user.findFirst({
      where: {
        OR: [{ email: dto.email }, { profile: { teamsId: dto.teamsId } }],
      },
    });

    if (existingUser) {
      throw new BadRequestException('Email or Teams ID already in use');
    }
    // Hash the password
    const hash = await bcrypt.hash(dto.password, 10);
    const user = await this.Prisma.user.create({
      data: {
        email: dto.email,
        hash,
        roleId: 2,
        status: true, // active by default
        profile: {
          create: {
            identity: await generateIdentity(this.Prisma, 'T'),
            fullname: dto.fullname,
            gender: dto.gender,
            dob: new Date(dto.dob),
            phone: dto.phone || null,
            teamsId: dto.teamsId,
          },
        },
      },
    });
    // After user is created, assign courses
    await this.Prisma.courseTeacher.createMany({
      data: dto.courses.map((courseId) => ({
        teacherId: user.id,
        courseId: Number(courseId),
      })),
    });
    await this.MailService.sendUserWelcome(user);
    return { status: 200, message: 'Teacher registered successfully' };
  }
  async registerLead(dto: any): Promise<response> {
    return { status: 200, message: 'hello' };
  }
  async allTeachers(filters:Record<string, any>): Promise<response & { teachers?: any ,total?:number, page?:number, totalPages?:number}> {
    const {  page = 1, limit = 10, ...rest} = filters;
    const profileFields = [
      'fullname',
      'country',
      'city',
      'state',
      'language',
      'gender',
      'marital_status',
      'education',
    ];
    
    const profileFilter: any = {};
    for (const key of profileFields) {
      if (rest[key]) {
        profileFilter[key] = {
          contains: rest[key],
          mode: 'insensitive',
        };
      }
    }
    // Handle status: 'active' = true, 'removed' = false
    let statusFilter: boolean | undefined;
    if (rest.status === 'active') statusFilter = true;
    if (rest.status === 'removed') statusFilter = false;
    
    const where: any = {
      roleId: 2,
      ...(statusFilter !== undefined && { status: statusFilter }),
      ...(Object.keys(profileFilter).length > 0 && {
        profile: { AND: Object.entries(profileFilter).map(([k, v]) => ({ [k]: v })) },
      }),
    };

    const [teachers, total] = await this.Prisma.$transaction([
      this.Prisma.user.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          profile: true,
          taughtCourses: { include: { course: true } },
        },
      }),
      this.Prisma.user.count({ where }),
    ]);
  
    if (!teachers) {
      return { status: 404, message: 'Teachers not found' };
    }
    return {
      status: 200,
      message: 'All teachers list',
      teachers,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
    // return { status: 200, message: 'All teachers List', teachers };
  }
  async teacherById(id: number): Promise<response & { teacher?: any }> {
    const teacher = await this.Prisma.user.findUnique({ where: { id } });
    if (!teacher) {
      return { status: 404, message: 'Teacher not found' };
    }
    return { status: 200, message: 'Teacher fetch successfully', teacher };
  }

  async deleteTeacherById(id:number):Promise<response>{
    const existingTeacher = await this.Prisma.user.findUnique({
      where: { id },
    });
  
    if (!existingTeacher) {
      throw new NotFoundException(`Teacher with ID ${id} not found`);
    }
  
    await this.Prisma.user.update({
      where: { id },
      data: { status: false },
    });
  
    return {
      status: 200,
      message: 'Teacher deleted successfully',
    };
  }
}
