import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import {
  AuthSignInDto,
  AuthSignUpDto,
  AuthUsername,
  ChangePassword,
  CreatePasswordDto,
} from './dto';
import { response } from 'src/common/types';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService {
  constructor(
    private Prisma: PrismaService,
    private JwtService: JwtService,
    private MailService: MailService,
    @Inject(OAuth2Client) private client: OAuth2Client,
  ) {}

  async hashData(data: string) {
    return bcrypt.hash(data, 10);
  }
  async getToken(id: number, email: string): Promise<string> {
    const payload = {
      sub: id,
      email,
    };
    const access_token = await this.JwtService.signAsync(payload, {
      secret: process.env.JWT_AT_SECRET, // Your JWT secret from environment variables
      expiresIn: '2d',
    });

    return access_token;
  }

  //services
  async verifyUniqueUsername(
    dto: AuthUsername,
  ): Promise<{ status: number; message: string }> {
    // Find the user by email
    const findUser = await this.Prisma.user.findUnique({
      where: {
        username: dto.username,
      },
    });
    if (!findUser) {
      return { status: 200, message: 'Username is available.' };
    }
    return { status: 200, message: 'Username already exists.' };
  }
  async signUp(
    dto: AuthSignUpDto,
  ): Promise<response & { user?: any; accessToken?: string }> {
    const hash: string = await this.hashData(dto.password);
    const existingEmail = await this.Prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingEmail) {
      throw new ConflictException('Email already exists.');
    }
    await this.verifyUniqueUsername({ username: dto.username });
    const newUser = await this.Prisma.user.create({
      data: {
        email: dto.email,
        username: dto.username,
        hash,
        role: {
          connect: { id: dto.roleId || 1 },
        },
      },
    });

    await this.MailService.sendUserConfirmation(newUser);
    const { hash: pass, ...rest } = newUser;
    return {
      status: 200,
      user: rest,
      message:
        'User created successfully. Please verify your email before logging in.',
    };
  }
  async signIn(dto: AuthSignInDto): Promise<{
    user?: any;
    accessToken?: string;
    message: string;
    status: number;
  }> {
    // Find the user by email
    const findUser: any = await this.Prisma.user.findUnique({
      where: {
        email: dto.email,
      },
      include: {
        role: {
          select: {
            name: true,
            permissions: true,
          },
        },
        profile: true,
      },
    });
    if (!findUser) {
      return { status: 422, message: 'User not found.' };
    }
    if (!findUser.status) {
      return { status: 422, message: 'Email is not verified yet.' };
    }
    const isPasswordValid = await bcrypt.compare(
      dto.password.trim(),
      findUser.hash,
    );
    if (!isPasswordValid) {
      return { status: 422, message: 'Invalid password.' };
    }
    const accessToken = await this.getToken(findUser.id, findUser.email);
    const { hash: pass, hashRt, ...rest } = findUser;
    return {
      status: 200,
      user: rest,
      accessToken,
      message: 'Sign-in successful.',
    };
  }
  // async googleSignIn(token: string): Promise<{
  //   user?: any;
  //   accessToken?: string;
  //   message: string;
  //   status: number;
  // }> {
  //   // Verify Google Token
  //   const ticket = await this.client.verifyIdToken({
  //     idToken: token,
  //     audience: process.env.GOOGLE_CLIENT_ID?.trim(),
  //   });
  //   if (!ticket) {
  //     throw new UnauthorizedException('Token verification failed');
  //   }

  //   const payload = ticket.getPayload();
  //   if (!payload) {
  //     throw new UnauthorizedException('Invalid token payload');
  //   }

  //   const { email, family_name, given_name, picture, sub } = payload;

  //   let user = await this.Prisma.user.findUnique({
  //     where: {
  //       email,
  //     },
  //     include: {
  //       role: {
  //         select: {
  //           name: true,
  //           permissions: true,
  //         },
  //       },
  //       profile: true,
  //     },
  //   });
  //   if (!user) {
  //     user = await this.Prisma.user.findUnique({
  //       where: {
  //         email,
  //       },
  //       include: {
  //         role: {
  //           select: {
  //             name: true,
  //             permissions: true,
  //           },
  //         },
  //         profile: true,
  //       },
  //     });
  //   }

  //   // If user does not exist, create a new one
  //   if (!user) {
  //     user = await this.Prisma.user.create({
  //       data: {
  //         email,
  //         googleId: sub,
  //         status: true, // Automatically verify email since it's from Google
  //         profile: {
  //           create: {
  //             firstName: given_name,
  //             lastName: family_name,
  //             avatar: picture,
  //           },
  //         },
  //         role: {
  //           connect: { id: 1 },
  //         },
  //       },
  //       include: {
  //         profile: true,
  //         role: {
  //           select: {
  //             name: true,
  //             permissions: true,
  //           },
  //         },
  //       },
  //     });
  //   }

  //   // Generate JWT token
  //   const accessToken = await this.getToken(user.id, user.email);
  //   return {
  //     status: 200,
  //     user,
  //     accessToken,
  //     message: 'Google sign-in successful.',
  //   };
  // }
  async getMe(id: number): Promise<any> {
    const user = await this.Prisma.user.findUnique({
      where: { id },
      include: {
        role: {
          select: {
            name: true,
            permissions: true,
          },
        },
        profile: true,
      },
    });
    if (!user) {
      return { status: 422, message: 'User not found.' };
    }
    const accessToken = await this.getToken(user.id, user.email);
    const { hash: pass, ...rest } = user;
    return {
      status: 200,
      user: rest,
      accessToken,
      message: 'Sign-in successful.',
    };
  }
  async changePassword(
    id: number,
    dto: ChangePassword,
  ): Promise<{ status: number; message: string }> {
    const user: any = await this.Prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordValid = await bcrypt.compare(dto.oldPassword, user.hash);

    if (!isPasswordValid) {
      return { status: 422, message: 'Invalid password.' };
    }
    const hash: string = await this.hashData(dto.newPassword);
    await this.Prisma.user.update({
      where: {
        id,
      },
      data: {
        hash,
      },
    });
    return {
      message: 'Password updated successfully',
      status: 200,
    };
  }
  async emailVerification(id: string): Promise<response> {
    const userId = Number(id);
    await this.Prisma.getUserWithDetails(userId);
    await this.Prisma.user.update({
      where: { id: userId },
      data: {
        status: true,
      },
    });
    return { status: 200, message: 'Email is verified successfuly.' };
  }
  async forgetPasswordSendEmail(email: string): Promise<response> {
    const findUser = await this.Prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!findUser) {
      return { status: 422, message: 'User not found.' };
    }
    const token = this.JwtService.sign(
      { userId: findUser.id },
      { expiresIn: '2h' },
    );

    await this.MailService.sendForgetPasswordEmail(email, token);
    return {
      status: 200,
      message:
        'Reset password request sent succefully. Please check your email box.',
    };
  }
  async createNewPassword(dto: CreatePasswordDto): Promise<response> {
    try {
      const decode = await this.JwtService.verify(dto.token);
      const userId = Number(decode.userId);
      const hash: string = await this.hashData(dto.password);
      await this.Prisma.getUserWithDetails(userId);

      await this.Prisma.user.update({
        where: { id: userId },
        data: {
          hash,
        },
      });
      return { status: 200, message: 'Password updated successfully.' };
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        // Handle token expiration
        return {
          status: 400,
          message: 'Token has expired. Please request a new one.',
        };
      }
      // Handle other errors
      throw new BadRequestException('Invalid token or other error occurred.');
    }
  }
  async getUsers(): Promise<any> {
    const users = await this.Prisma.user.findMany();
    return { users };
  }
}
