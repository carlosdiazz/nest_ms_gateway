import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, NAME_PRODUCT_SERVICE } from 'src/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: NAME_PRODUCT_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.PRODUCTS_MS_HOST,
          port: envs.PRODUCTS_MS_PORT,
        },
      },
    ]),
  ],
  controllers: [ProductsController],
})
export class ProductsModule {}
