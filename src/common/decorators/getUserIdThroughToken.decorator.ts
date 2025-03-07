import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const getId = createParamDecorator(
  (data: any, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    if (!data) return req.user;
    return req.user['sub'];
  },
);
