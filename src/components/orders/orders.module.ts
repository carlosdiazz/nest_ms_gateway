import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

//Propio
import { OrdersController } from './orders.controller';
import { envs, NAME_ORDER_SERVICE } from 'src/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: NAME_ORDER_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.ORDER_MS_HOST,
          port: envs.ORDER_MS_PORT,
        },
      },
    ]),
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
