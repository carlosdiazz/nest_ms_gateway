import { Module } from '@nestjs/common';
//Propio
import { ProductsModule } from 'src/components';
import { OrdersModule } from 'src/components/orders';

@Module({
  imports: [ProductsModule, OrdersModule],
})
export class AppModule {}
