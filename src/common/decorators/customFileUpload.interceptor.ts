import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
  Type,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { mixin } from '@nestjs/common';
import { tap, catchError } from 'rxjs/operators';

export function CustomFileInterceptor(
  fieldName: string,
  maxSize: number = 1e6,
  allowedTypes: string[] = ['jpg', 'jpeg', 'png'],
): Type<NestInterceptor> {
  @Injectable()
  class CustomInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const multerOptions = {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            const uniqueSuffix =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            const fileExt = extname(file.originalname);
            cb(null, `${file.fieldname}-${uniqueSuffix}${fileExt}`);
          },
        }),
        limits: { fileSize: maxSize },
        fileFilter: (req, file, cb) => {
          if (!allowedTypes.some((type) => file.mimetype.includes(type))) {
            return cb(new BadRequestException('Invalid file type'), false);
          }
          cb(null, true);
        },
      };

      // Create an instance of the FileInterceptor class with the provided options
      const fileInterceptor = new (FileInterceptor(fieldName, multerOptions))();

      const ctx = context.switchToHttp();
      const request = ctx.getRequest();
      const response = ctx.getResponse();

      // Use the fileInterceptor to handle file upload and return an Observable
      return new Observable((observer) => {
        fileInterceptor.intercept(context, {
          handle: () => {
            return next.handle().pipe(
              tap(() => observer.complete()), // Complete the observable when done
              catchError((err) => {
                observer.error(err); // Emit an error if it occurs
                return []; // Return an empty array to complete the observable
              }),
            );
          },
        });
      });
    }
  }

  return mixin(CustomInterceptor);
}
