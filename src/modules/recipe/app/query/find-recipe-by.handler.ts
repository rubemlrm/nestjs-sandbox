import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RecipeRepository } from '@src/modules/recipe/infrastructure/repositories/recipe.repository';
import { FindRecipeByQuery } from '@src/modules/recipe/app/query/find-recipe-by.query';

@Injectable()
@QueryHandler(FindRecipeByQuery)
export class FindRecipeByHandler implements IQueryHandler<FindRecipeByQuery> {
  constructor(private readonly repository: RecipeRepository) {}

  async execute(query: FindRecipeByQuery): Promise<any> {
    return this.repository.findBy(query);
  }
}
