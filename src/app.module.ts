import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { authGaurd } from './common/guard/authGuard';
import { MailModule } from './mail/mail.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    MailModule,
    MulterModule.register({ dest: './upload' }),
  ],
  providers: [{ provide: APP_GUARD, useClass: authGaurd }],
})
export class AppModule {}
