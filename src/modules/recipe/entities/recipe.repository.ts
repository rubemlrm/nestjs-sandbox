import { FindRecipeQuery } from '@src/modules/recipe/app/query/find-recipe.query';

export interface Repository {
  create(recipe: any): Promise<any>;
  update(recipe: any): Promise<any>;
  findOne(id: FindRecipeQuery): Promise<any>;
  findAll(): Promise<any[]>;
  delete(id: number): Promise<boolean>;
}
