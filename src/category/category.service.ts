import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CreateBookCategoryDto } from 'src/category/dto/create-category-dto';
import { BookCategory } from 'src/category/schemas.ts/bookCategory.schema';

@Injectable()
export class CategoryService {
    constructor(@InjectModel(BookCategory.name)
    private bookCategoryModel: mongoose.Model<BookCategory>) { }

    async createCategory(bookCategory: CreateBookCategoryDto): Promise<BookCategory> {
        const categoryExists = await this.bookCategoryModel.findOne({ categoryName: bookCategory.categoryName });

        if (categoryExists) {
            throw new ConflictException(`Category ${bookCategory.categoryName} already exists.`);
        }
        // if(bookCategory.ca)

        const response = await this.bookCategoryModel.create(bookCategory);
        return response;
    }

    async getAllBooksCategories(): Promise<BookCategory[]> {
        const response = await this.bookCategoryModel.find();
        return response;
    }
}
