import { Recipe } from '@src/modules/recipe/entities/recipe.entity';
import { Query } from '@nestjs/cqrs';

export class FindRecipeByQuery extends Query<Recipe> {
  readonly title: string;
  constructor(title?: string) {
    super();
    this.title = title;
  }
}
