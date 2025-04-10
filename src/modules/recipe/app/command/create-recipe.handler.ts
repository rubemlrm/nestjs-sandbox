import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RecipeCreateCommand } from '@src/modules/recipe/app/command/create-recipe.command';
import { CacheResult } from '@src/modules/shared/redis/redis.decorator';
import { Injectable } from '@nestjs/common';
import { RecipeRepository } from '@src/modules/recipe/infrastructure/repositories/recipe.repository';

@CommandHandler(RecipeCreateCommand)
@Injectable()
export class CreateRecipeHandler
  implements ICommandHandler<RecipeCreateCommand>
{
  constructor(private readonly repository: RecipeRepository) {}
  @CacheResult(120)
  async execute(command: RecipeCreateCommand) {
    return this.repository.create(command);
  }
}
