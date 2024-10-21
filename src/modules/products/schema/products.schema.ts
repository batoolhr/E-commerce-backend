import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({
    default: () => new mongoose.Types.ObjectId().toString(),
    type: String,
  })
  _id: string;

  @Prop()
  title: string;

  @Prop()
  price: string;

  @Prop()
  category: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop()
  archive: boolean;
}
export const ProductSchema = SchemaFactory.createForClass(Product);
