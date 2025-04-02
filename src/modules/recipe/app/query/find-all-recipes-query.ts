import { Recipe } from '@src/modules/recipe/entities/recipe.entity';
import { Query } from '@nestjs/cqrs';

export class FindAllRecipesQuery extends Query<Recipe> {
  constructor(public readonly id: number) {
    super();
  }
}
