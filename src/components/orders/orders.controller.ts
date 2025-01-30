import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { NAME_ORDER_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(NAME_ORDER_SERVICE) private readonly ordersClient: ClientProxy,
  ) {}

  @Post()
  private create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send('createOrder', createOrderDto);
  }

  @Get()
  private findAll() {
    return this.ordersClient.send('findAllOrders', {});
  }

  @Get(':id')
  private findOne(@Param('id') id: string) {
    return this.ordersClient.send('findOneOrder', {});
  }

  @Get('change:id')
  private changeStatus(@Param('id') id: string) {
    return this.ordersClient.send('changeStatusOrder', {});
  }
}
