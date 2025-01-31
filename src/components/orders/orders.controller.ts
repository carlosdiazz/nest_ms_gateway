import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  ParseUUIDPipe,
  Query,
  Patch,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

//Propio
import { CreateOrderDto } from './dto/create-order.dto';
import {
  NAME_NATS_SERVICE,
  //NAME_ORDER_SERVICE
} from 'src/config';
import { OrdersAllDto, StatusDto } from './dto/orders-all.dto';
import { PaginationDto } from 'src/common';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(NAME_NATS_SERVICE) private readonly client: ClientProxy,
  ) {}

  @Post()
  private create(@Body() createOrderDto: CreateOrderDto) {
    return this.client.send('createOrder', createOrderDto).pipe(
      catchError((err) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        throw new RpcException(err);
      }),
    );
  }

  @Get()
  private findAll(@Query() ordersAll: OrdersAllDto) {
    return this.client.send('findAllOrders', ordersAll).pipe(
      catchError((err) => {
        console.log(err);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        throw new RpcException(err);
      }),
    );
  }

  @Get('id/:id')
  private findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send('findOneOrder', { id }).pipe(
      catchError((err) => {
        console.log(err);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        throw new RpcException(err);
      }),
    );
  }

  @Get('status/:status')
  private findAllStatus(
    @Param() status: StatusDto,
    @Query() pagination: PaginationDto,
  ) {
    return this.client
      .send('findAllOrders', {
        ...pagination,
        status: status.status,
      })
      .pipe(
        catchError((err) => {
          console.log(err);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          throw new RpcException(err);
        }),
      );
  }

  @Patch(':id')
  private changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto,
  ) {
    return this.client
      .send('changeStatusOrder', {
        id,
        status: statusDto.status,
      })
      .pipe(
        catchError((err) => {
          console.log(err);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          throw new RpcException(err);
        }),
      );
  }
}
