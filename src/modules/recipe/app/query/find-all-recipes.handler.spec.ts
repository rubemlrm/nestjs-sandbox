import { Test, TestingModule } from '@nestjs/testing';
import { RecipeFactory } from '@src/modules/recipe/factories/recipe.factory';
import { PrismaModule } from '@src/prisma/prisma.module';
import { CqrsModule } from '@nestjs/cqrs';
import { Repository } from '../../entities/recipe.repository';
import { RecipeRepository } from '../../adapters/recipe.repository';
import { FindAllRecipesHandler } from '@src/modules/recipe/app/query/find-all-recipes.handler';

const recipeRepositoryMock: jest.Mocked<Repository> = {
  create: jest.fn(),
  update: jest.fn(),
  findOne: jest.fn(),
  findAll: jest.fn(),
  delete: jest.fn(),
};

describe('FindAllRecipesHandler', () => {
  let handler: FindAllRecipesHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, CqrsModule],
      providers: [
        FindAllRecipesHandler,
        {
          provide: RecipeRepository,
          useValue: recipeRepositoryMock,
        },
      ],
    }).compile();
    handler = module.get<FindAllRecipesHandler>(FindAllRecipesHandler);
  });

  it('should return a list of recipes', async () => {
    const command = await RecipeFactory.create();
    const createdRecipe = { ...command, id: 1 };
    recipeRepositoryMock.findAll.mockResolvedValue([createdRecipe]);

    const result = await handler.execute(null);
    expect(result).toEqual([createdRecipe]);
  });
});
