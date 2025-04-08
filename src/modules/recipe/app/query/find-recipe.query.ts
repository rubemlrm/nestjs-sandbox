import { Query } from '@nestjs/cqrs';
import { SingleRecipeDto } from '@src/modules/recipe/domain/recipe/single-recipe.dto';

export class FindRecipeQuery extends Query<SingleRecipeDto> {
  constructor(public readonly id: number) {
    super();
  }
}
