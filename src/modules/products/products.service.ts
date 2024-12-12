import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import { Product } from './schema/products.schema';
import { CategoriesService } from '../categories/categories.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { error } from 'console';
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    private readonly categoriesService: CategoriesService,
  ) {}

  async create(payload: CreateProductDto) {
    //@TODO:If need to store category as embedded schema
    // const category = await this.categoriesService.findOne(payload.categoryId);

    await this.productModel.create({
      ...payload,
      category: payload.categoryId,
    });
  }

  async findAll() {
    return await this.productModel.find().exec();
  }

  async findLimitProducts() {
    //@TODO:Handle limit in specific category
    const pipeline = [
      // {
      //   $match: {
      //     category: categoryId,
      //   },
      // },
      { $limit: 4 },
    ];

    const products = await this.productModel.aggregate(pipeline).exec();
    return products;
  }

  async findOne(categoryName: string) {
    const category = await this.categoriesService.findByName(categoryName);
    const pipeline = [
      {
        $match: {
          category: category._id,
        },
      },
    ];
    const res = await this.productModel.aggregate(pipeline).exec();
    return res;
  }

  async update(productId: string, payload: Partial<CreateProductDto>) {
    const single = await this.productModel.findOne({ _id: productId });
    if (!single) {
      throw new error('Not found');
    }

    await this.productModel.updateOne({ _id: productId }, { ...payload });
  }

  async delete(productId: string) {
    const single = await this.productModel.findOne({ _id: productId });
    if (!single) {
      throw new error('Not found');
    }

    await this.productModel.updateOne(
      { _id: productId },
      { $set: { archive: true } },
    );
  }
}
