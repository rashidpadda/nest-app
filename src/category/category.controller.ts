import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/enums/role.enum';
import { CreateBookCategoryDto } from 'src/category/dto/create-category-dto';
import { BookCategory } from 'src/category/schemas.ts/bookCategory.schema';
import { CategoryService } from './category.service';

@Controller('category')
@UseGuards(AuthGuard())
export class CategoryController {

    constructor(private categoryService: CategoryService) { }

    @Get('')
    async getAllBooksCategories(): Promise<BookCategory[]> {
        return this.categoryService.getAllBooksCategories();
    }

    @Post('/create')
    @Roles(Role.Admin)
    @UseGuards()
    async createBookCategory(
        @Body() bookCategory: CreateBookCategoryDto,  // Ensure the full DTO is passed
        @Req() req,
    ): Promise<BookCategory> {
        console.log('req', req.body);
        return this.categoryService.createCategory(bookCategory);  // Pass the whole DTO to the service
    }

}
