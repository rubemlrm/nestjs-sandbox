import { DeleteRecipeHandler } from '@src/modules/recipe/app/command/delete-recipe.handler';
import { PrismaService } from '@src/prisma/prisma.service';
import { prismaMock } from '../../../../../test/mocks/prisma.mock';
import { Test, TestingModule } from '@nestjs/testing';
import { RecipeFactory } from '@src/modules/recipe/factories/recipe.factory';

describe('DeleteRecipeHandler', () => {
  let handler: DeleteRecipeHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteRecipeHandler,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();
    handler = module.get<DeleteRecipeHandler>(DeleteRecipeHandler);
  });

  it('should delete a recipe', async () => {
    const command = await RecipeFactory.update();
    const deletedRecipe = { ...command };
    prismaMock.recipe.update.mockResolvedValue(deletedRecipe);

    const result = await handler.execute(command.id);
    expect(result).toBeUndefined();
  });
});
