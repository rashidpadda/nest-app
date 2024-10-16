import { Category } from '../schemas.ts/book.schema';

export class CreateBookDto {
  readonly title: string;
  readonly description: string;
  readonly author: string;
  readonly price: string;
  readonly category: Category;
}


export class UpdateBookDto {
    readonly title: string;
    readonly description: string;
    readonly author: string;
    readonly price: string;
    readonly category: Category;
  }
  