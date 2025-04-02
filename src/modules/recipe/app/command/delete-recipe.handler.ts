import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { ICommandHandler } from '@nestjs/cqrs';
import { DeleteRecipeCommand } from '@src/modules/recipe/app/command/delete-recipe.command';

@Injectable()
export class DeleteRecipeHandler
  implements ICommandHandler<DeleteRecipeCommand>
{
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: number) {
    await this.prisma.recipe.delete({
      where: { id: command },
    });
    return Promise.resolve(undefined);
  }
}
