import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from '../../prisma/prisma.service';
// Make sure to import your Prisma service correctly

@Injectable()
export class UserValidationInterceptor implements NestInterceptor {
  constructor(private readonly prisma: PrismaService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user?.sub; // Assuming the ID is in the 'sub' field of the user object

    if (!userId) {
      throw new NotFoundException('User ID not found in request');
    }

    // Validate if the user exists in the database
    const user = await this.prisma.getUserWithDetails(userId);

    return next.handle();
  }
}
