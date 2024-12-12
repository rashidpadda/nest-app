import { Category } from "src/auth/enums/category.enum";
import { User } from "src/auth/schemas/user.schemas";

export class UpdateBookDto {
  readonly title: string;
  readonly description: string;
  readonly author: string;
  readonly price: string;
  readonly category: Category;
  readonly userId: User;
  readonly userName: string

}
