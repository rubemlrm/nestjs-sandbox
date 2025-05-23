import { Logger, Module } from '@nestjs/common';
import { RecipeController } from './interfaces/controllers/recipe.controller';
import { PrismaModule } from '@src/modules/prisma/prisma.module';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateRecipeHandler } from '@src/modules/recipe/app/command/create-recipe.handler';
import { UpdateRecipeHandler } from './app/command/update-recipe.handler';
import { DeleteRecipeHandler } from './app/command/delete-recipe.handler';
import { RecipeRepository } from '@src/modules/recipe/infrastructure/repositories/recipe.repository';
import { RecipeService } from '@src/modules/recipe/app/service/recipe.service';
import { TitleExistsValidator } from '@src/modules/recipe/app/validators/unique-title.validator';
import { FindRecipeByHandler } from './app/query/find-recipe-by.handler';
import { FindRecipeHandler } from '@src/modules/recipe/app/query/find-recipe.handler';
import { FindAllRecipesHandler } from '@src/modules/recipe/app/query/find-all-recipes.handler';
import { LoggingCommandbus } from '@src/modules/shared/logging/logging.commandbus';
import { LoggingQuerybus } from '@src/modules/shared/logging/logging.querybus';
import { PrismaService } from '@src/modules/prisma/app/service/prisma.service';

const CommandHandlers = [
  CreateRecipeHandler,
  UpdateRecipeHandler,
  DeleteRecipeHandler,
  LoggingCommandbus,
];
const QueryHandlers = [
  FindRecipeByHandler,
  FindRecipeHandler,
  FindAllRecipesHandler,
  LoggingQuerybus,
];
const Validators = [TitleExistsValidator];
const Repositories = [RecipeRepository];
const Services = [RecipeService, PrismaService, Logger];
const Filters = [];

@Module({
  imports: [PrismaModule, CqrsModule],
  providers: [
    ...Services,
    ...CommandHandlers,
    ...QueryHandlers,
    ...Validators,
    ...Repositories,
    ...Filters,
  ],
  controllers: [RecipeController],
  exports: [RecipeService],
})
export class RecipeModule {}
