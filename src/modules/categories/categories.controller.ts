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
import { CategoriesService } from './categories.service';
import { Category } from './schema/categories.schema';
import { ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/createCategory.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('single')
  async create(@Body() payload: CreateCategoryDto) {
    return await this.categoriesService.create(payload);
  }
  @Get('/list')
  async findAll(): Promise<Category[]> {
    return await this.categoriesService.findAll();
  }

  @Put('single/:id')
  async update(@Param('id') id: string, @Query() payload: CreateCategoryDto) {
    return await this.categoriesService.update(id, payload);
  }

  @Delete('single/:id')
  async delete(@Param('id') id: string) {
    return await this.categoriesService.delete(id);
  }
}
