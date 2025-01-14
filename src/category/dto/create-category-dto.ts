import {
    IsNotEmpty,
    IsString,
} from 'class-validator';

export class CreateBookCategoryDto {
    @IsNotEmpty()
    @IsString()
    readonly categoryName: string;
}
