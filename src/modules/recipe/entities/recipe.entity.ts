export class Recipe {
  title: string;
  description: string;
  ingredients: string;
  instructions: string;

  constructor(
    title: string,
    ingredients: string,
    instructions: string,
    description?: string,
  ) {
    this.title = title;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.description = description;
  }
}
