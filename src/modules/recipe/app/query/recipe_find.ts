import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { QueryHandler } from '@src/modules/decorator/query';

@Injectable()
export class FindCommand implements QueryHandler<number, any> {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  async handle(query: number): Promise<any> {
    const cachedItem = await this.cacheManager.get(`recipe-${query}`);
    if (cachedItem === '{}') {
      return cachedItem;
    }

    const item = await this.prisma.recipe.findUnique({
      where: { id: query },
    });
    this.cacheManager.set(`recipe-${query}`, item, 10);
    return item;
  }
}
