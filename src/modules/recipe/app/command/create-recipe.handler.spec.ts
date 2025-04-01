import { CreateRecipeHandler } from '@src/modules/recipe/app/command/create-recipe.handler';
import { PrismaService } from '@src/prisma/prisma.service';
import { prismaMock } from '../../../../../test/mocks/prisma.mock';
import { Test, TestingModule } from '@nestjs/testing';
import { RecipeFactory } from '@src/modules/recipe/factories/recipe.factory';

describe('CreateRecipeHandler', () => {
  let handler: CreateRecipeHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateRecipeHandler,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();
    handler = module.get<CreateRecipeHandler>(CreateRecipeHandler);
  })

  it('should create a new recipe', async () => {
    const command = await RecipeFactory.create();
    const createdRecipe = {...command, id: 1};
    prismaMock.recipe.create.mockResolvedValue(createdRecipe);

    const result = await handler.execute(command);
    expect(result).toEqual({
      id: expect.any(Number),
      title: createdRecipe.title,
      ingredients: createdRecipe.ingredients,
      instructions: createdRecipe.instructions,
    });
    expect(prismaMock.recipe.create).toHaveBeenCalledWith({
      data: {
        title: createdRecipe.title,
        ingredients: createdRecipe.ingredients,
        instructions: createdRecipe.instructions,
      },})
  })
})
