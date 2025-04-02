import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindRecipeQuery } from '@src/modules/recipe/app/query/find-recipe.query';
import { Repository } from '@src/modules/recipe/entities/recipe.repository';

@Injectable()
@QueryHandler(FindRecipeQuery)
export class FindRecipeHandler implements IQueryHandler<FindRecipeQuery> {
  constructor(private readonly repository: Repository) {}

  async execute(query: FindRecipeQuery): Promise<any> {
    return this.repository.findOne(query.id);
  }
}
