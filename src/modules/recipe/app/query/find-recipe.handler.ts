import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindRecipeQuery } from '@src/modules/recipe/app/query/find-recipe.query';
import { RecipeRepository } from '@src/modules/recipe/infrastructure/repositories/recipe.repository';
import { RecipeNotFoundException } from '@src/modules/recipe/domain/exception/recipe-not-found.exception';

@Injectable()
@QueryHandler(FindRecipeQuery)
export class FindRecipeHandler implements IQueryHandler<FindRecipeQuery> {
  constructor(private readonly repository: RecipeRepository) {}

  async execute(query: FindRecipeQuery): Promise<any> {
    try {
      const recipe = await this.repository.findOne(query);
      if (!recipe) {
        throw new RecipeNotFoundException(query.id);
      }

      return recipe;
    } catch (error) {
      throw error;
    }
  }
}
