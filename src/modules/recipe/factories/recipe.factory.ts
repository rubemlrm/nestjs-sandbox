import { faker } from '@faker-js/faker';
import { RecipeCreateCommand } from '@src/modules/recipe/app/command/create-recipe.command';
import { UpdateRecipeDto } from '@src/modules/recipe/domain/recipe/update-recipe.dto';

export class RecipeFactory {
  static async create() : Promise<RecipeCreateCommand> {
    return {
      title: faker.food.dish(),
      ingredients: faker.food.ingredient(),
      instructions: faker.lorem.paragraph(),
    };
  }

  static async update() : Promise<UpdateRecipeDto> {
    return {
      id: faker.number.int({ min: 1, max: 100 }),
      title: faker.food.dish(),
      ingredients: faker.food.ingredient(),
      instructions: faker.lorem.paragraph(),
    };
  }
}
