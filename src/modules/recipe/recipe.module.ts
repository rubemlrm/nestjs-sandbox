import { Module } from '@nestjs/common';
import { RecipeController } from './ports/recipe.controller';
import { PrismaModule } from '@src/prisma/prisma.module';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateRecipeHandler } from '@src/modules/recipe/app/command/create-recipe.handler';
import { UpdateRecipeHandler } from './app/command/update-recipe.handler';
import { DeleteRecipeHandler } from './app/command/delete-recipe.handler';
import { RecipeRepository } from './adapters/recipe_repository';

@Module({
  imports: [PrismaModule, CqrsModule],
  providers: [
    CreateRecipeHandler,
    UpdateRecipeHandler,
    DeleteRecipeHandler,
    RecipeRepository,
    {
      provide: 'Repository',
      useClass: RecipeRepository,
    },
  ],
  controllers: [RecipeController],
})
export class RecipeModule {}
