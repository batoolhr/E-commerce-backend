import { Injectable, ConflictException } from '@nestjs/common';
import { createSingleUser } from './dto/create.dto';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(userData: any) {
    // Check if user with the same username or email already exists
    const existingUser = await this.userModel.findOne({
      $or: [{ username: userData.username }, { email: userData.email }],
    });

    if (existingUser) {
      throw new ConflictException('Username or email already exists');
    }

    const newUser = await this.userModel.create(userData);
    return newUser;
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  async findOne(id: string) {
    return await this.userModel.findOne({ _id: id }).exec();
  }

  async findById(id: string) {
    return await this.userModel.findOne({ _id: id }).exec();
  }

  async findByUsername(username: string) {
    return await this.userModel.findOne({ username }).exec();
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email }).exec();
  }

  async updateOne(id: string, userData: Partial<User>) {
    return await this.userModel
      .findByIdAndUpdate(id, userData, { new: true })
      .exec();
  }

  async deleteOne(id: string) {
    return await this.userModel.findByIdAndDelete(id).exec();
  }
}
