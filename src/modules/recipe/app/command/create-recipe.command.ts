import { ICommand } from '@nestjs/cqrs';
import { CreateRecipeDto } from '../../domain/recipe/create-recipe.dto';

export class RecipeCreateCommand implements ICommand {
  constructor(public readonly data: CreateRecipeDto) {}
}
