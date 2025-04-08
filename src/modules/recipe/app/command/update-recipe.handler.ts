import { Injectable } from '@nestjs/common';
import { UpdateRecipeCommand } from '@src/modules/recipe/app/command/update-recipe.command';
import { ICommandHandler } from '@nestjs/cqrs';
import { RecipeRepository } from '../../adapters/recipe_repository';
import { UpdateRecipeDto } from '@src/modules/recipe/domain/recipe/update-recipe.dto';

@Injectable()
export class UpdateRecipeHandler
  implements ICommandHandler<UpdateRecipeCommand>
{
  constructor(private readonly repository: RecipeRepository) {}
  async execute(command: UpdateRecipeCommand): Promise<UpdateRecipeDto | null> {
    return this.repository.update(command.data.id, command);
  }
}
