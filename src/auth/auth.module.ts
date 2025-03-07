import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from 'src/mail/mail.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { AtStrategy } from './strategies/AtStrategy';
import { OAuth2Client } from 'google-auth-library';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_AT_SECRET,
      signOptions: { expiresIn: '48h' },
    }),
    MailModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    AtStrategy,
    {
      provide: OAuth2Client,
      useFactory: () => new OAuth2Client(process.env.GOOGLE_CLIENT_ID?.trim()),
    },
  ],
})
export class AuthModule {}
