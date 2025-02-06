import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

//Propio
import { NAME_NATS_SERVICE } from 'src/config';
import { LoginUserDto, RegisterUserDto } from './dto';
import { AuthGuard } from './auth.guard';
import { UserDecorator } from './user.decorator';
import { CurrentUser } from './interface/current-user.interface';
import { TokenDecorator } from './token.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NAME_NATS_SERVICE) private readonly client: ClientProxy,
  ) {}

  @Post('register')
  private registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.client.send('auth.register.user', registerUserDto).pipe(
      catchError((err) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        throw new RpcException(err);
      }),
    );
  }

  @Post('login')
  private loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.client.send('auth.login.user', loginUserDto).pipe(
      catchError((err) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        throw new RpcException(err);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Get('verify-token')
  private verifyToken(
    @UserDecorator() user: CurrentUser,
    @TokenDecorator() token: string,
  ) {
    //console.log({ user, token });
    return {
      user,
      token,
    };
    //return this.client.send('auth.verify.token', {}).pipe(
    //  catchError((err) => {
    //    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    //    throw new RpcException(err);
    //  }),
    //);
  }
}
