import { Module } from '@nestjs/common';
import { RecipeController } from './ports/recipe.controller';
import { PrismaModule } from '@src/prisma/prisma.module';
import { CqrsModule } from '@nestjs/cqrs';
import { RecipeCreateHandler } from '@src/modules/recipe/app/command/create-recipe.handler';

@Module({
  imports: [PrismaModule, CqrsModule],
  providers: [RecipeCreateHandler],
  controllers: [RecipeController],
})
export class RecipeModule {}
