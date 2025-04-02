import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { UpdateRecipeDto } from '@src/modules/recipe/domain/recipe/update-recipe.dto';
import { CommandHandler } from '@src/modules/decorator/command';

@Injectable()
export class RecipeUpdateCommand implements CommandHandler<UpdateRecipeDto> {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  async handle(updateRecipeDto: UpdateRecipeDto) {
    this.prisma.recipe.update({
      where: { id: updateRecipeDto.id },
      data: updateRecipeDto,
    });
    return null;
  }
}
