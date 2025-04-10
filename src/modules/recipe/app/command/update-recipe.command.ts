import { ICommand } from '@nestjs/cqrs';
import { UpdateRecipeDto } from '@src/modules/recipe/app/dtos/update-recipe.dto';

export class UpdateRecipeCommand implements ICommand {
  constructor(
    public readonly id: number,
    public readonly data: UpdateRecipeDto,
  ) {}
}
