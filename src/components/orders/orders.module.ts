import { Module } from '@nestjs/common';
//import { ClientsModule, Transport } from '@nestjs/microservices';

//Propio
import { OrdersController } from './orders.controller';
//import { envs, NAME_ORDER_SERVICE } from 'src/config';
import { NatsModule } from '../transports';

@Module({
  imports: [
    //ClientsModule.register([
    //  {
    //    name: NAME_ORDER_SERVICE,
    //    transport: Transport.TCP,
    //    options: {
    //      //host: envs.ORDER_MS_HOST,
    //      //port: envs.ORDER_MS_PORT,
    //    },
    //  },
    //]),
    NatsModule,
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
