import { Test, TestingModule } from '@nestjs/testing';
import { RecipeFactory } from '@src/modules/recipe/factories/recipe.factory';
import { UpdateRecipeHandler } from '@src/modules/recipe/app/command/update-recipe.handler';
import { faker } from '@faker-js/faker';
import { Repository } from '../../entities/recipe.repository';
import { RecipeRepository } from '../../adapters/recipe_repository';

const recipeRepositoryMock: jest.Mocked<Repository> = {
  create: jest.fn(),
  update: jest.fn(),
  findOne: jest.fn(),
  findAll: jest.fn(),
  delete: jest.fn(),
};

describe('UpdateRecipeHandler', () => {
  let handler: UpdateRecipeHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateRecipeHandler,
        {
          provide: RecipeRepository,
          useValue: recipeRepositoryMock,
        },
      ],
    }).compile();
    handler = module.get<UpdateRecipeHandler>(UpdateRecipeHandler);
  });

  it('should update a recipe', async () => {
    const command = await RecipeFactory.update();
    const updatedRecipe = { ...command, title: faker.food.dish() };
    recipeRepositoryMock.update.mockResolvedValue(updatedRecipe);

    const result = await handler.execute(command);
    expect(result).toEqual({
      id: expect.any(Number),
      title: updatedRecipe.title,
      ingredients: updatedRecipe.ingredients,
      instructions: updatedRecipe.instructions,
    });
  });

  it('should throw an exception', async () => {
    const command = await RecipeFactory.update();
    recipeRepositoryMock.update.mockRejectedValue(
      new Error('Error updating recipe'),
    );

    await expect(handler.execute(command)).rejects.toThrow(
      'Error updating recipe',
    );
  });
});
