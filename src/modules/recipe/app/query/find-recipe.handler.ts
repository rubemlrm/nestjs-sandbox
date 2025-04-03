import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindRecipeQuery } from '@src/modules/recipe/app/query/find-recipe.query';
import { RecipeRepository } from '@src/modules/recipe/adapters/recipe_repository';

@Injectable()
@QueryHandler(FindRecipeQuery)
export class FindRecipeHandler implements IQueryHandler<number> {
  constructor(private readonly repository: RecipeRepository) {}

  async execute(query: number): Promise<any> {
    return this.repository.findOne(query);
  }
}
