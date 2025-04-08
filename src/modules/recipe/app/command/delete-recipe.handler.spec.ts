import { DeleteRecipeHandler } from '@src/modules/recipe/app/command/delete-recipe.handler';
import { Test, TestingModule } from '@nestjs/testing';
import { RecipeRepository } from '../../adapters/recipe_repository';
import { Repository } from '../../entities/recipe.repository';
import { faker } from '@faker-js/faker';
import { DeleteRecipeCommand } from '@src/modules/recipe/app/command/delete-recipe.command';

const recipeRepositoryMock: jest.Mocked<Repository> = {
  create: jest.fn(),
  update: jest.fn(),
  findOne: jest.fn(),
  findAll: jest.fn(),
  delete: jest.fn(),
};

describe('DeleteRecipeHandler', () => {
  let handler: DeleteRecipeHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteRecipeHandler,
        {
          provide: RecipeRepository,
          useValue: recipeRepositoryMock,
        },
      ],
    }).compile();
    handler = module.get<DeleteRecipeHandler>(DeleteRecipeHandler);
  });

  it('should delete a recipe', async () => {
    const command = new DeleteRecipeCommand(faker.number.int());
    recipeRepositoryMock.delete.mockResolvedValue(true);

    const result = await handler.execute(command);
    expect(result).toEqual('Recipe deleted successfully');
  });
});
