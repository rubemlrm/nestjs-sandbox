import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteRecipeCommand } from '@src/modules/recipe/app/command/delete-recipe.command';
import { RecipeRepository } from '@src/modules/recipe/infrastructure/repositories/recipe.repository';
import { RecipeNotFoundException } from '@src/modules/recipe/domain/exception/recipe-not-found.exception';

@Injectable()
@CommandHandler(DeleteRecipeCommand)
export class DeleteRecipeHandler
  implements ICommandHandler<DeleteRecipeCommand>
{
  constructor(private readonly repository: RecipeRepository) {}

  async execute(command: DeleteRecipeCommand): Promise<any> {
    const isDeleted = await this.repository.delete(command.id);
    if (isDeleted) {
      return 'Recipe deleted successfully';
    }
    throw new RecipeNotFoundException(command.id);
  }
}
