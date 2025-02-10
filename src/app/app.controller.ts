import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get()
  healthCheck() {
    return {
      error: false,
      message: 'Client Gateway is up',
      status_code: 200,
    };
  }
}
