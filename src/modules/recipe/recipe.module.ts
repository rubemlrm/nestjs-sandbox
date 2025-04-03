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

@Module({
  imports: [PrismaModule, CqrsModule],
  providers: [
    RecipeService,
    CreateRecipeHandler,
    UpdateRecipeHandler,
    DeleteRecipeHandler,
    TitleExistsValidator,
    FindRecipeByHandler,
    RecipeRepository,
    {
      provide: 'Repository',
      useClass: RecipeRepository,
    },
  ],
  controllers: [RecipeController],
  exports: [RecipeService],
})
export class RecipeModule {}
