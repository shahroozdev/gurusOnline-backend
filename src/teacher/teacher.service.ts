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
}
