import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import * as multer from 'multer';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Request } from 'express';
import { existsSync, mkdirSync } from 'fs';

interface FileUploadOptions {
  allowedFileTypes?: RegExp; // Regex to validate file types (optional)
  maxFileSize?: number; // Max file size in bytes (optional)
}

export const UploadedFilePath = createParamDecorator(
  (options: FileUploadOptions, ctx: ExecutionContext): Promise<string> => {
    const request: Request = ctx.switchToHttp().getRequest();

    return new Promise((resolve, reject) => {
      // Extract options
      const {
        allowedFileTypes = /\.(jpg|jpeg|png|gif|pdf)$/i,
        maxFileSize = 5 * 1024 * 1024,
      } = options || {};

      // Define multer storage configuration
      const storage: any = diskStorage({
        destination: (req, file, cb) => {
          const uploadDir = './uploads';
          if (!existsSync(uploadDir)) {
            mkdirSync(uploadDir, { recursive: true });
          }
          cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExt = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${fileExt}`);
        },
      });

      // Multer configuration
      const multerConfig = multer({
        storage,
        limits: { fileSize: maxFileSize }, // Set the file size limit
        fileFilter: (req, file, cb) => {
          if (!file.originalname.match(allowedFileTypes)) {
            return cb(
              new BadRequestException(
                `Invalid file type! Allowed types: ${allowedFileTypes}`,
              ),
            );
          }
          cb(null, true);
        },
      }).single('file'); // Single file upload

      // Handle the file upload
      multerConfig(request, request.res, (err: any) => {
        if (err instanceof multer.MulterError) {
          if (err.code === 'LIMIT_FILE_SIZE') {
            return reject(
              new BadRequestException(
                `File size is too large! Maximum size allowed is ${maxFileSize / (1024 * 1024)} MB.`,
              ),
            );
          }
          return reject(new BadRequestException(err.message));
        } else if (err) {
          return reject(err);
        }

        // Resolve the uploaded file's path
        if (request.file) {
          resolve(
            `${storage.getDestination(request, request.file)}/${request.file.filename}`,
          );
        } else {
          resolve(null);
        }
      });
    });
  },
);
