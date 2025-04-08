import { BaseException } from '@src/modules/common/exceptions/base.exception';

export class RecipeNotFoundException extends BaseException {
  constructor(recipeId: number) {
    super(`Recipe with ID ${recipeId} not found`, 9999);
  }
}
