import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema, Book } from './schemas.ts/book.schema';
import { AuthModule } from 'src/auth/auth.module';
import { BookCategorySchema, BookCategory } from '../category/schemas.ts/bookCategory.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }, { name: BookCategory.name, schema: BookCategorySchema }])
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule { }
