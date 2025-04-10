import { BaseException } from '@src/modules/shared/exceptions/base.exception';

export class RecipeNotFoundException extends BaseException {
  constructor(recipeId: number) {
    super(`Recipe with ID ${recipeId} not found`, 9999);
  }
}
