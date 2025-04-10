import { faker } from '@faker-js/faker';
import { CreateRecipeDto } from '@src/modules/recipe/app/dtos/create-recipe.dto';
import { UpdateRecipeDto } from '@src/modules/recipe/app/dtos/update-recipe.dto';

export class RecipeFactory {
  static async create(): Promise<CreateRecipeDto> {
    return {
      title: faker.food.dish(),
      ingredients: faker.food.ingredient(),
      instructions: faker.lorem.paragraph(),
    };
  }

  static async update(): Promise<UpdateRecipeDto> {
    return {
      id: faker.number.int({ min: 1, max: 100 }),
      title: faker.food.dish(),
      ingredients: faker.food.ingredient(),
      instructions: faker.lorem.paragraph(),
    };
  }
}
