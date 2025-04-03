import { ICommand } from '@nestjs/cqrs';
import { CreateRecipeDto } from '../../domain/recipe/create-recipe.dto';

export class RecipeCreateCommand implements ICommand {
  title: string;
  ingredients: string;
  instructions: string;
  constructor(recipe: CreateRecipeDto) {
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions;
    this.title = recipe.title;
  }
}
