import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

export const TokenDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!request.token) {
      throw new InternalServerErrorException('Token not found in request');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return request.token as string;
  },
);
