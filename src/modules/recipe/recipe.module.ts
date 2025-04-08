import { Module } from '@nestjs/common';
import { RecipeController } from './ports/recipe.controller';
import { PrismaModule } from '@src/prisma/prisma.module';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateRecipeHandler } from '@src/modules/recipe/app/command/create-recipe.handler';
import { UpdateRecipeHandler } from './app/command/update-recipe.handler';
import { DeleteRecipeHandler } from './app/command/delete-recipe.handler';
import { RecipeRepository } from './adapters/recipe_repository';
import { RecipeService } from '@src/modules/recipe/service/recipe.service';
import { TitleExistsValidator } from '@src/modules/recipe/validators/unique-title.validator';
import { FindRecipeByHandler } from './app/query/find-recipe-by.handler';
import { FindRecipeHandler } from '@src/modules/recipe/app/query/find-recipe.handler';
import { FindAllRecipesHandler } from '@src/modules/recipe/app/query/find-all-recipes.handler';

const CommandHandlers = [
  CreateRecipeHandler,
  UpdateRecipeHandler,
  DeleteRecipeHandler,
];
const QueryHandlers = [
  FindRecipeByHandler,
  FindRecipeHandler,
  FindAllRecipesHandler,
];
const Validators = [TitleExistsValidator];
const Repositories = [RecipeRepository];
const Services = [RecipeService];
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
