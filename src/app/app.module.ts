import { Module } from '@nestjs/common';
//Propio
import { AuthModule, ProductsModule } from 'src/components';
import { OrdersModule } from 'src/components/orders';

@Module({
  imports: [ProductsModule, OrdersModule, AuthModule],
})
export class AppModule {}
