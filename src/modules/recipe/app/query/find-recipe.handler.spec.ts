import { Test, TestingModule } from '@nestjs/testing';
import { RecipeFactory } from '@src/modules/recipe/factories/recipe.factory';
import { PrismaModule } from '@src/modules/prisma/prisma.module';
import { CqrsModule } from '@nestjs/cqrs';
import { Repository } from '../../entities/recipe.repository';
import { RecipeRepository } from '../../adapters/recipe.repository';
import { FindRecipeHandler } from '@src/modules/recipe/app/query/find-recipe.handler';
import { FindRecipeQuery } from '@src/modules/recipe/app/query/find-recipe.query';
import { faker } from '@faker-js/faker';
import { RecipeNotFoundException } from '@src/modules/recipe/app/exception/recipe-not-found.exception';

const recipeRepositoryMock: jest.Mocked<Repository> = {
  create: jest.fn(),
  update: jest.fn(),
  findOne: jest.fn(),
  findAll: jest.fn(),
  delete: jest.fn(),
};

describe('FindRecipeHandler', () => {
  let handler: FindRecipeHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, CqrsModule],
      providers: [
        FindRecipeHandler,
        {
          provide: RecipeRepository,
          useValue: recipeRepositoryMock,
        },
      ],
    }).compile();
    handler = module.get<FindRecipeHandler>(FindRecipeHandler);
  });

  it('should return a recipe', async () => {
    const command = await RecipeFactory.create();
    const createdRecipe = { ...command, id: 1 };
    recipeRepositoryMock.findOne.mockResolvedValue(createdRecipe);

    const result = await handler.execute(new FindRecipeQuery(createdRecipe.id));
    expect(result).toEqual(createdRecipe);
  });

  it('should throw an exception because a not found recipe', async () => {
    const id = faker.number.int();
    const query = new FindRecipeQuery(id);
    recipeRepositoryMock.findOne.mockResolvedValue(undefined);
    await expect(handler.execute(query)).rejects.toThrow(
      RecipeNotFoundException,
    );
  });
});
