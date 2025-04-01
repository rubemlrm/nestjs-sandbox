import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { QueryHandler } from '@src/modules/decorator/query';

@Injectable()
export class FindAllCommand implements QueryHandler<void, any[]> {
  constructor(private readonly prisma: PrismaService,
              @Inject(CACHE_MANAGER)
              private cacheManager: Cache){}

  async handle() {
    const cachedRecipes = await this.cacheManager.get("all-recipes");

    if (Array.isArray(cachedRecipes) && cachedRecipes.length > 0) {
      console.log("retuning cachedRecipes")
      return cachedRecipes;
    }
    console.log("getting new recipes");
    const recipes = await this.prisma.recipe.findMany();
    this.cacheManager.set('all-recipes', recipes, 10);

    return recipes;
  }
}
