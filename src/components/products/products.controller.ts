import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';

//Propio
import { PaginationDto } from 'src/common';
import {
  NAME_NATS_SERVICE,
  //NAME_PRODUCT_SERVICE
} from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(NAME_NATS_SERVICE) private readonly client: ClientProxy,
  ) {}

  @Post()
  private create(@Body() createProductDto: CreateProductDto) {
    return this.client.send('create_product', createProductDto).pipe(
      catchError((err) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        throw new RpcException(err);
      }),
    );
  }

  @Get()
  private findAll(@Query() paginationDto: PaginationDto) {
    return this.client.send('find_all_product', paginationDto).pipe(
      catchError((err) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        throw new RpcException(err);
      }),
    );
  }

  @Get(':id')
  private async findOne(@Param('id', ParseIntPipe) id: number) {
    //Este es otro metodo apra controlar los errores
    try {
      const product = await firstValueFrom(
        this.client.send('find_product', { id }),
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return product;
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      throw new RpcException(e);
    }
  }

  @Delete(':id')
  private delete(@Param('id', ParseIntPipe) id: number) {
    return this.client
      .send('remove_product', {
        id,
      })
      .pipe(
        catchError((err) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          throw new RpcException(err);
        }),
      );
  }

  @Patch(':id')
  private update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.client
      .send('update_product', {
        id,
        ...updateProductDto,
      })
      .pipe(
        catchError((err) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          throw new RpcException(err);
        }),
      );
  }
}
