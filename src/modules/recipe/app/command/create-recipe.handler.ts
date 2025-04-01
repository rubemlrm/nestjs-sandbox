import { PrismaService } from '@src/prisma/prisma.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RecipeCreateCommand } from '@src/modules/recipe/app/command/create-recipe.command';
import { CacheResult } from '@src/modules/redis/redis.decorator';

@CommandHandler(RecipeCreateCommand)
export class CreateRecipeHandler implements ICommandHandler<RecipeCreateCommand> {
  constructor(private readonly prisma: PrismaService){}
  @CacheResult(120)
  async execute(command: RecipeCreateCommand) {
    const recipe = await this.prisma.recipe.create({
      data: {
        title: command.title,
        ingredients: command.ingredients,
        instructions: command.instructions,
      },
    });

    return recipe;
  }
}
