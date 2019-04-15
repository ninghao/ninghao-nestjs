import { Category } from "../category/category.entity";

export class PostDto {
  readonly title: string;
  readonly body: string;
  readonly category: Category;
}