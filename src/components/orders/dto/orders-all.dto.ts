import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common';
import { OrdersStatusList, OrderStatus } from '../enum/order-enum';

export class OrdersAllDto extends PaginationDto {
  @IsOptional()
  @IsEnum(OrdersStatusList, {
    message: `Possible status values are ${OrdersStatusList.join(', ')}`,
  })
  status: OrderStatus;
}

export class StatusDto {
  //@IsOptional()
  @IsEnum(OrdersStatusList, {
    message: `Possible status values are ${OrdersStatusList.join(', ')}`,
  })
  status: OrderStatus;
}
