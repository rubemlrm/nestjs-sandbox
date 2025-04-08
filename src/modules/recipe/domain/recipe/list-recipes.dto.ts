import { Recipe } from '@src/modules/recipe/domain/recipe/single-recipe.dto';

export type ListRecipesDto = {
  items: Recipe[];
};
