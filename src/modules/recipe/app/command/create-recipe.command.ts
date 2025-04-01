import { ICommand } from '@nestjs/cqrs';

export class RecipeCreateCommand implements ICommand {
  title: string;
  ingredients: string;
  instructions: string;
  constructor(
    title: string,
    ingredients: string,
    instructions: string, description?: string) {
  }
}
