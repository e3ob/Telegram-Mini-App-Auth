import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const DbUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.dbUser || null;
  },
);
