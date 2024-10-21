import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
  @Prop({
    default: () => new mongoose.Types.ObjectId().toString(),
    type: String,
  })
  _id: string;

  @Prop()
  title: string;
  //   @Prop()
  //   price: string;
  //   @Prop()
  //   category: 'jewelery';
  //   @Prop()
  //   description: string;
  //   @Prop()
  //   image: '...';
}
export const CategorySchema = SchemaFactory.createForClass(Category);
