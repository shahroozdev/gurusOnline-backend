import { Injectable } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterLeadDto } from './dto';
import { response } from 'src/common/types';

@Injectable()
export class StudentService {
    constructor (
            private Prisma: PrismaService,
            private MailService: MailService,
    ){}

    async getCourses(filters: { filters?: Record<string, string> }):Promise<response & {courses?:any}>{
        const courses = await this.Prisma.course.findMany();
        if(!courses){
            return {status:404, message:'Courses not found'}
        }
        return {status:200, message:'All Courses List', courses}
    }
    async getCourse({
        id,
        filters,
      }: {
        id: string;
        filters?: Record<string, string>;
      }): Promise<response & { course?: any }> {
        const course = await this.Prisma.course.findUnique({
          where: { id:Number(id) },
        });
      
        if (!course) {
          return { status: 404, message: 'Course not found' };
        }
      
        return { status: 200, message: 'Course fetched successfully.', course };
      }
    async registerLead(dto:RegisterLeadDto):Promise<response>{
        return {status:200, message:'hello'}
    }
}
