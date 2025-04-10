import { ICommand } from '@nestjs/cqrs';
import { CreateRecipeDto } from '@src/modules/recipe/app/dtos/create-recipe.dto';

export class RecipeCreateCommand implements ICommand {
  constructor(public readonly data: CreateRecipeDto) {}
}
