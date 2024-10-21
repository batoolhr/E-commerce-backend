import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from './modules/categories/categories.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.DB_CONNECTION_STRING ||
        'mongodb://localhost:27017/e-commerce',
    ),
    ProductsModule,
    CategoriesModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
