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
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await container.stop();
  });

  it('should create a recipe', async () => {
    const newRecipe = new RecipeCreateCommand(await RecipeFactory.create());
    const result = await repo.create(newRecipe);
    expect(result).toBeDefined();
  });
});
