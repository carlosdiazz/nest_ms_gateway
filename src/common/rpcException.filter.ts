import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

interface RpcError {
  status: number;
  message: string;
}

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const rpcError = exception.getError();

    if (this.isRpcError(rpcError)) {
      //const status = rpcError.status;
      return response.status(400).json(rpcError);
    }

    if (rpcError['message']) {
      response.status(400).json({
        status: 400,
        message: rpcError['message'],
      });
    } else {
      response.status(500).json({
        status: 500,
        message: 'Error desconocido',
      });
    }
  }

  private isRpcError(error: any): error is RpcError {
    return (
      typeof error === 'object' &&
      error !== null &&
      'status' in error &&
      'message' in error
    );
  }
}
