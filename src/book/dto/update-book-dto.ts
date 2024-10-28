import { User } from "src/auth/schemas/user.schemas";
import { Category } from "../schemas.ts/book.schema";

export class UpdateBookDto {
    readonly title: string;
    readonly description: string;
    readonly author: string;
    readonly price: string;
    readonly category: Category;
    readonly userId: User;
    readonly userName: string

  }
  