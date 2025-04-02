import { CreateRecipeHandler } from '@src/modules/recipe/app/command/create-recipe.handler';
import { Test, TestingModule } from '@nestjs/testing';
import { RecipeFactory } from '@src/modules/recipe/factories/recipe.factory';
import { PrismaModule } from '@src/prisma/prisma.module';
import { CqrsModule } from '@nestjs/cqrs';
import { Repository } from '../../entities/recipe.repository';
import { RecipeRepository } from '../../adapters/recipe_repository';

const recipeRepositoryMock: jest.Mocked<Repository> = {
  create: jest.fn(),
  update: jest.fn(),
  findOne: jest.fn(),
  findAll: jest.fn(),
  delete: jest.fn(),
};

describe('CreateRecipeHandler', () => {
  let handler: CreateRecipeHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, CqrsModule],
      providers: [
        CreateRecipeHandler,
        {
          provide: RecipeRepository,
          useValue: recipeRepositoryMock,
        },
      ],
    }).compile();
    handler = module.get<CreateRecipeHandler>(CreateRecipeHandler);
  });

  it('should create a new recipe', async () => {
    const command = await RecipeFactory.create();
    const createdRecipe = { ...command, id: 1 };
    recipeRepositoryMock.create.mockResolvedValue(createdRecipe);

    const result = await handler.execute(command);
    expect(result).toEqual(createdRecipe);
  });
});
