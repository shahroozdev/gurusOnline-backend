import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: any) {
    const url = process.env.BASE_URL + `api/auth/emailVerification/${user.id}`; //updating url

    try {
      const res = await this.mailerService.sendMail({
        to: user.email,
        // from: '"Support Team" <support@example.com>', // override default from
        subject: 'Welcome to Guru is Online! Confirm your Email',
        template: './confirmation', // `.hbs` extension is appended automatically
        context: {
          // ✏️ filling curly brackets with content
          name: user.fName,
          url,
        },
      });
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  async sendUserWelcome(user: any) {
    const url = process.env.BASE_URL+'/login'

    try {
      const res = await this.mailerService.sendMail({
        to: user.email,
        // from: '"Support Team" <support@example.com>', // override default from
        subject: 'Welcome to Guru is Online!',
        template: './welcome', // `.hbs` extension is appended automatically
        context: {
          // ✏️ filling curly brackets with content
          name: user.fName,
          url,
        },
      });
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
  async sendForgetPasswordEmail(email: string, token: string) {
    const url =
      process.env.FRONTEND_LOGIN_URL + `reset-password?token=${token}`;

    try {
      const res = await this.mailerService.sendMail({
        to: email,
        // from: '"Support Team" <support@example.com>', // override default from
        subject: 'Forget Password',
        template: './resetPassword', // `.hbs` extension is appended automatically
        context: {
          // ✏️ filling curly brackets with content
          email: email,
          url,
        },
      });
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
  async sendUserInvitation(
    user: any,
    name2: string,
    role: string,
    password: string,
  ) {
    const url = process.env.BASE_URL + `auth/emailVerification/${user.id}`;

    try {
      const res = await this.mailerService.sendMail({
        to: user.email,
        // from: '"Support Team" <support@example.com>', // override default from
        subject: 'Welcome to Eq360! Confirm your Invitation',
        template: './invitation', // `.hbs` extension is appended automatically
        context: {
          // ✏️ filling curly brackets with content
          name: user.username,
          email: user.email,
          name2,
          role,
          password,
          url,
        },
      });
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
