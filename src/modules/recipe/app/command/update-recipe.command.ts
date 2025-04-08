import { ICommand } from '@nestjs/cqrs';
import { UpdateRecipeDto } from '@src/modules/recipe/domain/recipe/update-recipe.dto';

export class UpdateRecipeCommand implements ICommand {
  constructor(public readonly data: UpdateRecipeDto) {}
}
