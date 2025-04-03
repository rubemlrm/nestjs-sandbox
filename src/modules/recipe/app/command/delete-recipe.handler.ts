import { Injectable } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { DeleteRecipeCommand } from '@src/modules/recipe/app/command/delete-recipe.command';
import { RecipeRepository } from '../../adapters/recipe_repository';

@Injectable()
export class DeleteRecipeHandler
  implements ICommandHandler<DeleteRecipeCommand>
{
  constructor(private readonly repository: RecipeRepository) {}

  async execute(command: number) {
    return this.repository.delete(command);
  }
}
