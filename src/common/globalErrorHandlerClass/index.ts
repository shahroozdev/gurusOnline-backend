import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';

const logger = new Logger('APIWrapper');

export const apiWrapper = async <T>(
  logic: () => Promise<T> | T, // Function containing your logic
): Promise<T> => {
  try {
    return await logic();
  } catch (error: any) {
    logger.error(error?.message || error, error.stack);
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      const fields = error.meta?.target;
      const fieldNames = Array.isArray(fields) ? fields.join(', ') : fields;
      throw new HttpException(
        `A unique constraint violation occurred on field(s): ${fieldNames}. Please check your input and try again.`,
        HttpStatus.CONFLICT,
      );
    }
    if (error instanceof HttpException) {
      // Re-throw known HttpExceptions
      throw error;
    } else {
      // Wrap other errors with a generic message
      throw new HttpException(
        `An error occurred. Please try again. Error:${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
};
