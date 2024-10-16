import { Injectable, NotFoundException } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { Book } from './schemas.ts/book.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Query } from 'express-serve-static-core';
import { Types } from 'mongoose';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async findAll(query: Query): Promise<Book[]> {
    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    const books = await this.bookModel.find({ ...keyword });
    return books;
  }

  async create(book: Book): Promise<Book> {
    const response = await this.bookModel.create(book);
    return response;
  }

  async findBookById(id: string): Promise<Book> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid ID format: ${id}`);
    } 
    const book = await this.bookModel.findById(id);
    if (!book || null) {
      throw new NotFoundException(`With this ${id} book not found.`);
    }
    return book;
  }
  async updateBookById(id: string, book: Book): Promise<Book> {
    return await this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    });
  }

  async deleteBookById(id: string): Promise<Book> {
    return await this.bookModel.findByIdAndDelete(id);
  }
}
