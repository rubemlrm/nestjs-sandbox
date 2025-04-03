import { Repository } from '@src/modules/recipe/entities/recipe.repository';
import { PrismaService } from '@src/prisma/prisma.service';
import { RecipeCreateCommand } from '@src/modules/recipe/app/command/create-recipe.command';
import { UpdateRecipeCommand } from '@src/modules/recipe/app/command/update-recipe.command';
import { Injectable } from '@nestjs/common';
import { FindRecipeByQuery } from '../app/query/find-recipe-by.query';

@Injectable()
export class RecipeRepository implements Repository {
  constructor(private readonly prisma: PrismaService) {}

  async create(recipe: RecipeCreateCommand): Promise<any> {
    const result = await this.prisma.recipe.create({
      data: {
        title: recipe.title,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
      },
    });

    return result;
  }

  async update(
    id: number,
    recipe: UpdateRecipeCommand,
  ): Promise<UpdateRecipeCommand | null> {
    try {
      const updatedRecord = await this.prisma.recipe.update({
        where: { id: id },
        data: recipe,
      });
      return updatedRecord;
    } catch (error) {
      throw new Error(`Error updating recipe: ${error.message}`);
    }
  }

  async findOne(id: number): Promise<any> {
    const item = await this.prisma.recipe.findUnique({
      where: { id: id },
    });
    return item;
  }

  async findAll(): Promise<any[]> {
    const recipes = await this.prisma.recipe.findMany();
    return recipes;
  }

  async findBy(query: FindRecipeByQuery): Promise<any> {
    console.log(query);
    const recipe = await this.prisma.recipe.findFirst({
      where: {
        title: query.title,
      },
    });
    console.warn(recipe);
    return recipe;
  }

  async delete(id: number): Promise<void> {
    await this.prisma.recipe.delete({
      where: { id: id },
    });
    return Promise.resolve(undefined);
  }
}
