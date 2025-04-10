import { Test, TestingModule } from '@nestjs/testing';
import { execSync } from 'child_process';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { PrismaService } from '@src/prisma/prisma.service';
import { RecipeRepository } from '@src/modules/recipe/adapters/recipe.repository';
import { RecipeFactory } from '@src/modules/recipe/factories/recipe.factory';
import { RecipeCreateCommand } from '@src/modules/recipe/app/command/create-recipe.command';
import { Logger } from '@nestjs/common';
import { UpdateRecipeCommand } from '@src/modules/recipe/app/command/update-recipe.command';
import { FindRecipeQuery } from '@src/modules/recipe/app/query/find-recipe.query';

describe('Recipe Repository integration', () => {
  let container: StartedPostgreSqlContainer;
  let prisma: PrismaService;
  let repo: RecipeRepository;

  beforeAll(async () => {
    container = await new PostgreSqlContainer().start();
    const dbUrl = `postgresql://${container.getUsername()}:${container.getPassword()}@${container.getHost()}:${container.getPort()}/${container.getDatabase()}?schema=public`;
    process.env.DATABASE_URL = dbUrl;

    // 🛠 Apply schema
    execSync(`npx prisma db push`, {
      env: { ...process.env, DATABASE_URL: dbUrl },
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, RecipeRepository, Logger],
    }).compile();
    prisma = module.get(PrismaService);
    repo = module.get<RecipeRepository>(RecipeRepository);
  }, 600000);

  afterAll(async () => {
    await prisma.$disconnect();
    await container.stop();
  });

  afterEach(async () => {
    await prisma.recipe.deleteMany();
  });

  describe('create', () => {
    it('should create a recipe', async () => {
      const newRecipe = new RecipeCreateCommand(await RecipeFactory.create());
      const result = await repo.create(newRecipe);
      expect(result).toBeDefined();
    });

    it('should throw a duplicated entry when create a recipe', async () => {
      const newRecipe = new RecipeCreateCommand(await RecipeFactory.create());
      const result = await repo.create(newRecipe);
      expect(result).toBeDefined();
      await expect(repo.create(newRecipe)).rejects.toThrow(
        'A recipe with this title already exists.',
      );
    });

    it('should throw an error if exists missing fields', async () => {
      const newRecipe = new RecipeCreateCommand(await RecipeFactory.create());
      delete newRecipe.data.ingredients;
      await expect(repo.create(newRecipe)).rejects.toThrow('Validation error');
    });
  });
  describe('update', () => {
    it('should update a recipe', async () => {
      const newRecipe = new RecipeCreateCommand(await RecipeFactory.create());
      const createdRecipe = await repo.create(newRecipe);
      const updatedRecipe = { ...createdRecipe, title: 'Updated Title' };
      const updateCommand = new UpdateRecipeCommand(
        createdRecipe.id,
        updatedRecipe,
      );
      const result = await repo.update(updateCommand);
      expect(result).toBeDefined();
      expect(result.title).toEqual(updatedRecipe.title);
    });

    it('should throw an error if recipe not found', async () => {
      const updateCommand = new UpdateRecipeCommand(
        999,
        await RecipeFactory.update(),
      );
      await expect(repo.update(updateCommand)).rejects.toThrow(
        'Recipe with ID 999 not found.',
      );
    });
  });

  describe('findOne', () => {
    it('should find a recipe by ID', async () => {
      const newRecipe = new RecipeCreateCommand(await RecipeFactory.create());
      const createdRecipe = await repo.create(newRecipe);
      const result = await repo.findOne(new FindRecipeQuery(createdRecipe.id));
      expect(result).toBeDefined();
      expect(result.id).toEqual(createdRecipe.id);
    });

    it('should return an empty recipe if recipe not found', async () => {
      const result = await repo.findOne(new FindRecipeQuery(999));
      expect(result).toEqual(null);
    });
  });

  describe('findAll', () => {
    it('should return all recipes', async () => {
      const newRecipe = new RecipeCreateCommand(await RecipeFactory.create());
      await repo.create(newRecipe);
      const result = await repo.findAll();
      expect(result).toBeDefined();
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('delete', () => {
    it('should delete a recipe', async () => {
      const newRecipe = new RecipeCreateCommand(await RecipeFactory.create());
      const createdRecipe = await repo.create(newRecipe);
      await repo.delete(createdRecipe.id);
      const result = await repo.findOne(new FindRecipeQuery(createdRecipe.id));
      expect(result).toEqual(null);
    });

    it('should throw an error if recipe not found', async () => {
      const result = await repo.delete(999);
      expect(result).toEqual(false);
    });
  });
});
