import { Repository } from '@src/modules/recipe/entities/recipe.repository';
import { PrismaService } from '@src/prisma/prisma.service';
import { RecipeCreateCommand } from '@src/modules/recipe/app/command/create-recipe.command';
import { UpdateRecipeCommand } from '@src/modules/recipe/app/command/update-recipe.command';
import { Injectable, Logger } from '@nestjs/common';
import { FindRecipeByQuery } from '../app/query/find-recipe-by.query';
import { Prisma, Recipe } from '@prisma/client';
import { FindRecipeQuery } from '@src/modules/recipe/app/query/find-recipe.query';
import { UpdateRecipeDto } from '@src/modules/recipe/domain/recipe/update-recipe.dto';
import { SingleRecipeDto } from '@src/modules/recipe/domain/recipe/single-recipe.dto';

@Injectable()
export class RecipeRepository implements Repository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
  ) {}

  async create(recipe: RecipeCreateCommand): Promise<any> {
    try {
      return await this.prisma.recipe.create({
        data: {
          title: recipe.data.title,
          ingredients: recipe.data.ingredients,
          instructions: recipe.data.instructions,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          this.logger.error(
            `Recipe with title ${recipe.data.title} already exists.`,
          );
          throw new Error('A recipe with this title already exists.');
        }
      }
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new Error(`Validation error: ${error.message}`);
      }
      throw new Error(`Error creating new recipe: ${error.message}`);
    }
  }

  async update(recipe: UpdateRecipeCommand): Promise<UpdateRecipeDto | null> {
    try {
      return await this.prisma.recipe.update({
        where: { id: recipe.id },
        data: recipe.data,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new Error(`Recipe with ID ${recipe.id} not found.`);
        }
      }
      this.logger.error(`Error updating recipe: ${error.message}`);
      throw new Error(`Error updating recipe: ${error.message}`);
    }
  }

  async findOne(id: FindRecipeQuery): Promise<SingleRecipeDto | any> {
    return this.prisma.recipe.findUnique({
      where: { id: id.id },
    });
  }

  async findAll(): Promise<Recipe[]> {
    return this.prisma.recipe.findMany();
  }

  async findBy(query: FindRecipeByQuery): Promise<SingleRecipeDto | null> {
    return this.prisma.recipe.findUnique({
      where: {
        title: query.title,
      },
    });
  }

  async delete(id: number): Promise<boolean> {
    try {
      await this.prisma.recipe.delete({
        where: { id: id },
      });
      return true;
    } catch (error) {
      if (error.code === 'P2025') {
        return false;
      }
      throw new Error(`Error deleting recipe: ${error.message}`);
    }
  }
}
