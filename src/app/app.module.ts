import { Module } from '@nestjs/common';
//Propio
import { ProductsModule } from 'src/components';

@Module({
  imports: [ProductsModule],
})
export class AppModule {}
