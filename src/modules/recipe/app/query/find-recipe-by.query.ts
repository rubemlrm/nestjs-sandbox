import { Query } from '@nestjs/cqrs';
import { Recipe } from '@prisma/client';
export class FindRecipeByQuery extends Query<Recipe> {
  readonly title: string;
  constructor(title?: string) {
    super();
    this.title = title;
  }
}
