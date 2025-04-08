import { Query } from '@nestjs/cqrs';
import { Recipe } from '@prisma/client';

export class FindAllRecipesQuery extends Query<Recipe[]> {
  constructor(public readonly id: number) {
    super();
  }
}
