import { CreateRecipeHandler } from '@src/modules/recipe/app/command/create-recipe.handler';
import { Test, TestingModule } from '@nestjs/testing';
import { RecipeFactory } from '@src/modules/recipe/test/factories/recipe.factory';
import { PrismaModule } from '@src/modules/prisma/prisma.module';
import { CqrsModule } from '@nestjs/cqrs';
import { Repository } from '@src/modules/recipe/domain/recipe/repositories/recipe.repository.interface';
import { RecipeRepository } from '@src/modules/recipe/infrastructure/repositories/recipe.repository';
import { RecipeCreateCommand } from '@src/modules/recipe/app/command/create-recipe.command';

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
    const command = new RecipeCreateCommand(await RecipeFactory.create());
    const createdRecipe = { ...command, id: 1 };
    recipeRepositoryMock.create.mockResolvedValue(createdRecipe);

    const result = await handler.execute(command);
    expect(result).toEqual(createdRecipe);
  });
});
