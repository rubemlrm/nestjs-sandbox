import { CreateRecipeDto } from '@src/modules/recipe/app/dtos/create-recipe.dto';
import { UpdateRecipeDto } from '@src/modules/recipe/app/dtos/update-recipe.dto';

export interface RecipeControllerInterface {
  create(createRecipeDto: CreateRecipeDto);
  findAll();
  findOne(id: number);
  update(id: number, updateRecipeDto: UpdateRecipeDto);
  remove(id: number);
}
