import { Repository } from '@src/modules/recipe/entities/recipe.repository';
import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllRecipesQuery } from '@src/modules/recipe/app/query/find-all-recipes-query';
import { FindRecipeQuery } from '@src/modules/recipe/app/query/find-recipe.query';

@Injectable()
@QueryHandler(FindAllRecipesQuery)
export class FindAllCommand implements IQueryHandler<FindAllRecipesQuery> {
  constructor(private readonly repository: Repository) {}

  async execute(query: FindRecipeQuery): Promise<any> {
    console.log('FindAllCommand', query);
    return await this.repository.findAll();
  }
}
