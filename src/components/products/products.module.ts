import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { NatsModule } from '../transports';
//import { ClientsModule, Transport } from '@nestjs/microservices';
//import {
//  envs,
//  NAME_NATS_SERVICE,
//  //NAME_PRODUCT_SERVICE
//} from 'src/config';

@Module({
  imports: [
    //ClientsModule.register([
    //  {
    //    name: NAME_NATS_SERVICE,
    //    transport: Transport.NATS,
    //    options: {
    //      servers: envs.NATS_SERVERS,
    //    },
    //  },
    //  //{
    //  //  name: NAME_PRODUCT_SERVICE,
    //  //  transport: Transport.TCP,
    //  //  options: {
    //  //    host: envs.PRODUCTS_MS_HOST,
    //  //    port: envs.PRODUCTS_MS_PORT,
    //  //  },
    //  //},
    //]),
    NatsModule,
  ],
  controllers: [ProductsController],
})
export class ProductsModule {}
