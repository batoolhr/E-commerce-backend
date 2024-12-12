import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    default: () => new mongoose.Types.ObjectId().toString(),
    type: String,
  })
  _id: string;

  @Prop()
  name: string;
  @Prop()
  email: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
