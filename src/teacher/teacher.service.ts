import { Injectable } from '@nestjs/common';
import { response } from 'src/common/types';
import { MailService } from 'src/mail/mail.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TeacherService {
  constructor(
    private Prisma: PrismaService,
    private MailService: MailService,
  ) {}

  async registerTeacher(dto: any): Promise<response> {
    return;
  }
  async registerLead(dto: any): Promise<response> {
    return { status: 200, message: 'hello' };
  }
  async allTeachers():Promise<response & {teachers?:any}>{
    const teachers = await this.Prisma.user.findMany({where:{roleId:2}});
    if(!teachers){
        return {status:404, message:'Teachers not found'}
    }
    return {status:200, message:'All teachers List', teachers}
}
async teacherById(id:number):Promise<response & {teacher?:any}>{
    const teacher = await this.Prisma.user.findUnique({where:{id}});
    if(!teacher){
        return {status:404, message:'Teacher not found'}
    }
    return {status:200, message:'Teacher fetch successfully', teacher}
}
}
