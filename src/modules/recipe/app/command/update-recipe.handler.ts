import { Injectable } from '@nestjs/common';
import { UpdateRecipeCommand } from '@src/modules/recipe/app/command/update-recipe.command';
import { ICommandHandler } from '@nestjs/cqrs';
import { RecipeRepository } from '../../adapters/recipe_repository';

@Injectable()
export class UpdateRecipeHandler
  implements ICommandHandler<UpdateRecipeCommand>
{
  constructor(private readonly repository: RecipeRepository) {}
  async execute(
    command: UpdateRecipeCommand,
  ): Promise<UpdateRecipeCommand | null> {
    return this.repository.update(command.id, command);
  }
}
