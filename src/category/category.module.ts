import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BookCategory, BookCategorySchema } from 'src/category/schemas.ts/bookCategory.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: BookCategory.name, schema: BookCategorySchema }])
  ],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule { }
