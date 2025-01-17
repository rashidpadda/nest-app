import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Query } from 'express-serve-static-core';
import * as mongoose from 'mongoose';
import { Types } from 'mongoose';
import { User } from '../auth/schemas/user.schemas';
import { Book } from './schemas.ts/book.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>
  ) { }

  async findAll(query: Query): Promise<Book[]> {
    try {
      const currentPage = Number(query.page) || 1;
      const resPerPage = Number(query.limit) || 10;
      console.log(currentPage, 'currentPage');
      const skip = resPerPage * (currentPage - 1);

      const keyword = query.keyword
        ? {
          title: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
        : {};

      const books = await this.bookModel
        .find({ ...keyword })
        .limit(resPerPage)
        .skip(skip);
      return books;
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: "Something went wrong can't all books",
      }, HttpStatus.FORBIDDEN, {
        cause: error
      })

    }

  }

  async create(book: Book, user: User): Promise<Book> {
    const data = Object.assign(book, { userId: user._id, userName: user.name });
    const response = await this.bookModel.create(data);
    return response;
  }

  async findBookById(id: string): Promise<Book> {
    console.log(id, "id")
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
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid ID format: ${id}`);
    }
    return await this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    });
  }

  async deleteBookById(id: string): Promise<Book> {
    return await this.bookModel.findByIdAndDelete(id);
  }




}


