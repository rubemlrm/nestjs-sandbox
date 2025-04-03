import { ICommand } from '@nestjs/cqrs';

export class UpdateRecipeCommand implements ICommand {
  id: number;
  title: string;
  ingredients: string;
  instructions: string;

  constructor(
    id: number,
    title: string,
    ingredients: string,
    instructions: string,
  ) {
    this.id = id;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.title = title;
  }
}
