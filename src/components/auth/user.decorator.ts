import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { CurrentUser } from './interface/current-user.interface';

export const UserDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): CurrentUser => {
    const request = ctx.switchToHttp().getRequest();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!request.user) {
      throw new InternalServerErrorException('User not found in request');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return request.user as CurrentUser;
  },
);
