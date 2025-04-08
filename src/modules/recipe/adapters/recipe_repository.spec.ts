import { RecipeRepository } from './recipe_repository';
import { PrismaService } from '@src/prisma/prisma.service';
import { RecipeCreateCommand } from '@src/modules/recipe/app/command/create-recipe.command';
import { UpdateRecipeCommand } from '@src/modules/recipe/app/command/update-recipe.command';
import { TestingModule, Test } from '@nestjs/testing';
import { RecipeFactory } from '../factories/recipe.factory';
import { FindRecipeQuery } from '@src/modules/recipe/app/query/find-recipe.query';

describe('RecipeRepository', () => {
  let recipeRepository: RecipeRepository;
  const prismaMock = {
    recipe: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    $connect: jest.fn(),
    $disconnect: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecipeRepository,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();
    recipeRepository = module.get<RecipeRepository>(RecipeRepository);
  });

  describe('create', () => {
    it('should create a recipe', async () => {
      const data = await RecipeFactory.create();
      const recipeCommand: RecipeCreateCommand = new RecipeCreateCommand(data);
      const createdRecipe = { id: 1, ...recipeCommand };
      prismaMock.recipe.create.mockResolvedValue(createdRecipe);

      const result = await recipeRepository.create(recipeCommand);

      expect(prismaMock.recipe.create).toHaveBeenCalledWith({
        data: data,
      });
      expect(result).toEqual(createdRecipe);
    });
  });

  describe('update', () => {
    it('should update a recipe', async () => {
      const id = 1;
      const updateCommand: UpdateRecipeCommand = new UpdateRecipeCommand(
        await RecipeFactory.update(),
      );
      const updatedRecipe = { id, ...updateCommand };
      prismaMock.recipe.update.mockResolvedValue(updatedRecipe);

      const result = await recipeRepository.update(id, updateCommand);

      expect(prismaMock.recipe.update).toHaveBeenCalledWith({
        where: { id },
        data: updateCommand,
      });
      expect(result).toEqual(updatedRecipe);
    });

    it('should throw an error if update fails', async () => {
      const id = 1;
      const updateCommand: UpdateRecipeCommand = new UpdateRecipeCommand(
        await RecipeFactory.update(),
      );
      prismaMock.recipe.update.mockRejectedValue(new Error('Update failed'));

      await expect(recipeRepository.update(id, updateCommand)).rejects.toThrow(
        'Error updating recipe: Update failed',
      );
    });
  });

  describe('findOne', () => {
    it('should find a recipe by id', async () => {
      const id = 1;
      const recipe = {
        id,
        title: 'Test Recipe',
        ingredients: 'Test Ingredients',
        instructions: 'Test Instructions',
      };
      prismaMock.recipe.findUnique.mockResolvedValue(recipe);

      const result = await recipeRepository.findOne(new FindRecipeQuery(id));

      expect(prismaMock.recipe.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(recipe);
    });
  });

  describe('findAll', () => {
    it('should return all recipes', async () => {
      const recipes = [
        {
          id: 1,
          title: 'Recipe 1',
          ingredients: 'Ingredients 1',
          instructions: 'Instructions 1',
        },
        {
          id: 2,
          title: 'Recipe 2',
          ingredients: 'Ingredients 2',
          instructions: 'Instructions 2',
        },
      ];
      prismaMock.recipe.findMany.mockResolvedValue(recipes);

      const result = await recipeRepository.findAll();

      expect(prismaMock.recipe.findMany).toHaveBeenCalled();
      expect(result).toEqual(recipes);
    });
  });

  describe('delete', () => {
    it('should delete a recipe by id', async () => {
      const id = 1;
      prismaMock.recipe.delete.mockResolvedValue(undefined);

      await recipeRepository.delete(id);

      expect(prismaMock.recipe.delete).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });
});
