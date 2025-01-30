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
import { NAME_ORDER_SERVICE } from 'src/config';
import { OrdersAllDto, StatusDto } from './dto/orders-all.dto';
import { PaginationDto } from 'src/common';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(NAME_ORDER_SERVICE) private readonly ordersClient: ClientProxy,
  ) {}

  @Post()
  private create(@Body() createOrderDto: CreateOrderDto) {
    console.log(createOrderDto);
    return this.ordersClient.send('createOrder', createOrderDto).pipe(
      catchError((err) => {
        console.log(err);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        throw new RpcException(err);
      }),
    );
  }

  @Get()
  private findAll(@Query() ordersAll: OrdersAllDto) {
    return this.ordersClient.send('findAllOrders', ordersAll).pipe(
      catchError((err) => {
        console.log(err);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        throw new RpcException(err);
      }),
    );
  }

  @Get('id/:id')
  private findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersClient.send('findOneOrder', { id }).pipe(
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
    return this.ordersClient
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
    return this.ordersClient
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
