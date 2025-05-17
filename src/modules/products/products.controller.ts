import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('single')
  async create(@Body() payload: CreateProductDto) {
    return await this.productsService.create(payload);
  }

  @Public()
  @Get('/list')
  async findAll() {
    return await this.productsService.findAll();
  }

  @Get('/limit')
  async listLimitProducts() {
    return await this.productsService.findLimitProducts();
  }

  @Public()
  @Get('/single/:categoryName')
  async findOne(@Param('categoryName') categoryName: string) {
    return await this.productsService.findOne(categoryName);
  }

  @Put('single/:id')
  async update(@Param('id') id: string, @Query() payload: CreateProductDto) {
    return await this.productsService.update(id, payload);
  }

  @Delete('single/:id')
  async delete(@Param('id') id: string) {
    return await this.productsService.delete(id);
  }
}
