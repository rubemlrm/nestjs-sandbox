import { RecipeRepository } from './recipe.repository';
import { PrismaService } from '@src/modules/prisma/prisma.service';
import { RecipeCreateCommand } from '@src/modules/recipe/app/command/create-recipe.command';
import { UpdateRecipeCommand } from '@src/modules/recipe/app/command/update-recipe.command';
import { TestingModule, Test } from '@nestjs/testing';
import { RecipeFactory } from '../factories/recipe.factory';
import { FindRecipeQuery } from '@src/modules/recipe/app/query/find-recipe.query';
import { Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
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

  const mockLogger = {
    log: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
    verbose: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecipeRepository,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
        {
          provide: Logger,
          useValue: mockLogger,
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
    it('should throw an error if recipe already exists', async () => {
      const data = await RecipeFactory.create();
      const recipeCommand: RecipeCreateCommand = new RecipeCreateCommand(data);
      const knowErrorParams = {
        code: 'P2002',
      } as Prisma.PrismaClientKnownRequestError;
      prismaMock.recipe.create.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError(
          `A recipe with this title already exists.`,
          knowErrorParams,
        ),
      );

      await expect(recipeRepository.create(recipeCommand)).rejects.toThrow(
        'A recipe with this title already exists.',
      );
    });
    it('should throw an error if exists missing fields', async () => {
      const data = await RecipeFactory.create();
      const recipeCommand: RecipeCreateCommand = new RecipeCreateCommand(data);
      const knowErrorParams = new Prisma.PrismaClientValidationError(
        'Missing required fields for creating a recipe.',
        {
          clientVersion: '4.0.0',
        },
      );
      prismaMock.recipe.create.mockRejectedValue(
        new Prisma.PrismaClientValidationError(
          `Missing required fields for creating a recipe.`,
          knowErrorParams,
        ),
      );

      await expect(recipeRepository.create(recipeCommand)).rejects.toThrow(
        'Missing required fields for creating a recipe.',
      );
    });
    it('should throw an error on a unknown handled error code', async () => {
      const data = await RecipeFactory.create();
      const recipeCommand: RecipeCreateCommand = new RecipeCreateCommand(data);
      const knowErrorParams = {
        code: 'P2013',
      } as Prisma.PrismaClientKnownRequestError;
      prismaMock.recipe.create.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError(
          `Error creating new recipe: ${knowErrorParams.code}`,
          knowErrorParams,
        ),
      );

      await expect(recipeRepository.create(recipeCommand)).rejects.toThrow(
        `Error creating new recipe: ${knowErrorParams.code}`,
      );
    });
  });

  describe('update', () => {
    it('should update a recipe', async () => {
      const id = 1;
      const updateCommand: UpdateRecipeCommand = new UpdateRecipeCommand(
        id,
        await RecipeFactory.update(),
      );
      const updatedRecipe = { id, ...updateCommand };
      prismaMock.recipe.update.mockResolvedValue(updatedRecipe);

      const result = await recipeRepository.update(updateCommand);

      expect(prismaMock.recipe.update).toHaveBeenCalledWith({
        where: { id },
        data: updateCommand.data,
      });
      expect(result).toEqual(updatedRecipe);
    });

    it('should throw an error if exists missing fields', async () => {
      const data = await RecipeFactory.update();
      const recipeCommand: UpdateRecipeCommand = new UpdateRecipeCommand(
        data.id,
        data,
      );
      const knowErrorParams = {
        code: 'P2025',
      } as Prisma.PrismaClientKnownRequestError;
      prismaMock.recipe.update.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError(
          `Recipe with ID ${data.id} not found.`,
          knowErrorParams,
        ),
      );

      await expect(recipeRepository.update(recipeCommand)).rejects.toThrow(
        `Recipe with ID ${data.id} not found.`,
      );
    });

    it('should throw an error if update fails', async () => {
      const id = 1;
      const updateCommand: UpdateRecipeCommand = new UpdateRecipeCommand(
        id,
        await RecipeFactory.update(),
      );
      prismaMock.recipe.update.mockRejectedValue(new Error('Update failed'));

      await expect(recipeRepository.update(updateCommand)).rejects.toThrow(
        'Error updating recipe: Update failed',
      );
      expect(mockLogger.error).toHaveBeenCalledWith(
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
    it('should return false if record was not found', async () => {
      const id = 1;
      const knowErrorParams = {
        code: 'P2025',
      } as Prisma.PrismaClientKnownRequestError;
      prismaMock.recipe.delete.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError(
          `Recipe with ID ${id} not found.`,
          knowErrorParams,
        ),
      );
      const result = await recipeRepository.delete(id);
      expect(result).toEqual(false);
    });

    it('should throw an error because of unknown error code', async () => {
      const id = 1;
      const knowErrorParams = {
        code: 'P2013',
      } as Prisma.PrismaClientKnownRequestError;
      prismaMock.recipe.delete.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError(
          `failed to delete recipe: ${knowErrorParams.code}`,
          knowErrorParams,
        ),
      );

      await expect(recipeRepository.delete(id)).rejects.toThrow(
        `Error deleting recipe: failed to delete recipe: ${knowErrorParams.code}`,
      );
    });
  });
});
