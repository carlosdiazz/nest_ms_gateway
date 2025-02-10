import { Module } from '@nestjs/common';
//Propio
import { AuthModule, ProductsModule } from 'src/components';
import { OrdersModule } from 'src/components/orders';
import { AppController } from './app.controller';

@Module({
  imports: [ProductsModule, OrdersModule, AuthModule],
  controllers: [AppController],
})
export class AppModule {}
