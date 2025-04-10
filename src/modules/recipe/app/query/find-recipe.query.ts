import { Query } from '@nestjs/cqrs';
import { SingleRecipeDto } from '@src/modules/recipe/app/dtos/single-recipe.dto';

export class FindRecipeQuery extends Query<SingleRecipeDto> {
  constructor(public readonly id: number) {
    super();
  }
}
