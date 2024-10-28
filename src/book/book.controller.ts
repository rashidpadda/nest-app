import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas.ts/book.schema';
import { CreateBookDto } from './dto/create-book-dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { UpdateBookDto } from './dto/update-book-dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guards';

@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  @Roles(Role.Moderator, Role.Admin, Role.User)
  @UseGuards(AuthGuard(), RolesGuard)
  async getAllBooks(@Query() query: ExpressQuery): Promise<Book[]> {
    return this.bookService.findAll(query);
  }

  @Post()
  @UseGuards(AuthGuard())
  async createBook(
    @Body()
    book: CreateBookDto,
    @Req() req,
  ): Promise<Book> {
    console.log('req', req.body);

    return this.bookService.create(book, req.user);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async getBook(
    @Param('id')
    id: string,
  ): Promise<Book> {
    return this.bookService.findBookById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  async updateBook(
    @Param('id')
    id: string,
    @Body()
    book: UpdateBookDto,
  ): Promise<Book> {
    return this.bookService.updateBookById(id, book);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteBookById(
    @Param('id')
    id: string,
  ): Promise<Book> {
    return this.bookService.deleteBookById(id);
  }
}
