import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllRecipesQuery } from '@src/modules/recipe/app/query/find-all-recipes-query';
import { RecipeRepository } from '@src/modules/recipe/infrastructure/repositories/recipe.repository';

@Injectable()
@QueryHandler(FindAllRecipesQuery)
export class FindAllRecipesHandler
  implements IQueryHandler<FindAllRecipesQuery>
{
  constructor(private readonly repository: RecipeRepository) {}

  async execute(_query: null): Promise<any> {
    return await this.repository.findAll();
  }
}
