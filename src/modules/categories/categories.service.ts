import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Error, Model } from 'mongoose';
import { Category } from './schema/categories.schema';
import { CreateCategoryDto } from './dto/createCategory.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async create(payload: CreateCategoryDto) {
    await this.categoryModel.create({ ...payload });
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryModel.find().exec();
  }

  async findOne(categoryId: string) {
    return await this.categoryModel.findOne({ _id: categoryId });
  }

  async findByName(categoryName: string) {
    const categoryId = await this.categoryModel.findOne({
      title: categoryName,
    });

    return categoryId;
  }

  async update(categoryId: string, payload: Partial<CreateCategoryDto>) {
    const single = await this.categoryModel.findOne({ _id: categoryId });
    if (!single) {
      throw new Error('Not found');
    }

    await this.categoryModel.updateOne({ _id: categoryId }, { ...payload });
  }

  async delete(categoryId: string) {
    const single = await this.categoryModel.findOne({ _id: categoryId });
    if (!single) {
      throw new Error('Not found');
    }

    await this.categoryModel.updateOne(
      { _id: categoryId },
      { $set: { archive: true } },
    );
  }
}
