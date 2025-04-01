import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { RecipeController } from '@src/modules/recipe/ports/recipe.controller';
import { RecipeService } from '@src/modules/recipe/recipe.service';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    PrismaModule,
    CacheModule.register(
      {
        isGlobal: true,
        store: redisStore,
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
      }
    ),
    ConfigModule.forRoot(
      {
        isGlobal: true,
      }
    )
  ],
  controllers: [AppController, RecipeController],
  providers: [AppService, RecipeService],
})
export class AppModule { }
