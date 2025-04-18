import { Injectable } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterLeadDto } from './dto';
import { response } from 'src/common/types';

@Injectable()
export class StudentService {
  constructor(
    private Prisma: PrismaService,
    private MailService: MailService,
  ) {}

  async getCourses(filters: {
    filters?: Record<string, string>;
  }): Promise<response & { courses?: any }> {
    const courses = await this.Prisma.course.findMany();
    if (!courses) {
      return { status: 404, message: 'Courses not found' };
    }
    return { status: 200, message: 'All Courses List', courses };
  }
  async getCourse({
    id,
    filters,
  }: {
    id: string;
    filters?: Record<string, string>;
  }): Promise<response & { course?: any }> {
    const course = await this.Prisma.course.findUnique({
      where: { id: Number(id) },
    });

    if (!course) {
      return { status: 404, message: 'Course not found' };
    }

    return { status: 200, message: 'Course fetched successfully.', course };
  }
  async createCourse(dto: any): Promise<response> {
    return;
  }
  async registerStudent(dto: any): Promise<response> {
    return;
  }
  async allStudents(): Promise<response & { students?: any }> {
    const students = await this.Prisma.user.findMany({ where: { roleId: 1 } });
    if (!students) {
      return { status: 404, message: 'Students not found' };
    }
    return { status: 200, message: 'All Students List', students };
  }
  async studentById(id: number): Promise<response & { students?: any }> {
    const students = await this.Prisma.user.findUnique({ where: { id } });
    if (!students) {
      return { status: 404, message: 'Student not found' };
    }
    return { status: 200, message: 'Students fetch successfully', students };
  }
  async registerLead(dto: RegisterLeadDto): Promise<response> {
    const lead = await this.Prisma.studentLeads.create({
      data: {
        fullName: dto.fullName,
        country: dto.country,
        email: dto.email,
        teamId: dto.teamId,
        phoneNumber: dto.phoneNumber,
        residenceNumber: dto.residenceNumber,
        preferedTime: dto.preferedTime,
        purpose: dto.purpose,
      },
    });
    return {
      status: 200,
      message: 'Lead registered successfully',
    };
  }
  async allLeads(): Promise<response & { students?: any }> {
    const students = await this.Prisma.studentLeads.findMany({ where: { status: true } });
    if (!students) {
      return { status: 404, message: 'Students Leads not found' };
    }
    return { status: 200, message: 'All Students Leads List', students };
  }
  async leadById(id: number): Promise<response & { students?: any }> {
    const students = await this.Prisma.studentLeads.findUnique({ where: { id } });
    if (!students) {
      return { status: 404, message: 'Student not found' };
    }
    return { status: 200, message: 'Students fetch successfully', students };
  }
}
