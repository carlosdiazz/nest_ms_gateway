import { Controller, Get } from '@nestjs/common';

@Controller('app')
export class AppController {
  @Get('health-check')
  healthCheck() {
    return {
      error: false,
      message: 'Client Gateway is up',
      status_code: 200,
    };
  }
}
