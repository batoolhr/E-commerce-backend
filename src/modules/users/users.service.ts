import { Injectable } from '@nestjs/common';
import { createSingleUser } from './dto/create.dto';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async create(payload: createSingleUser) {
    await this.userModel.create({
      ...payload,
    });
  }

  async findAll() {}

  async findOne(id: string) {
    const single = await this.userModel.findOne({ _id: id });
    if (!single) {
    }
    return single;
  }

  async updateOne() {}

  async deleteOne() {}
}
