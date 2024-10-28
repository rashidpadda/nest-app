import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';
import { Category } from '../schemas.ts/book.schema';
import { User } from 'src/auth/schemas/user.schemas';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly author: string;

  @IsNotEmpty()
  @IsNumber()
  readonly price: string;

  @IsNotEmpty()
  @IsEnum(Category, { message: 'Please enter correct category' })
  readonly category: Category;

  readonly userId: User;
  readonly userName: string;
}
