import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RecipeCreateCommand } from '@src/modules/recipe/app/command/create-recipe.command';
import { FindRecipeByQuery } from '@src/modules/recipe/app/query/find-recipe-by.query';
import { CreateRecipeDto } from '../domain/recipe/create-recipe.dto';
import { UpdateRecipeDto } from '../domain/recipe/update-recipe.dto';
import { FindRecipeQuery } from '@src/modules/recipe/app/query/find-recipe.query';
import { FindAllRecipesQuery } from '@src/modules/recipe/app/query/find-all-recipes-query';
import { UpdateRecipeCommand } from '@src/modules/recipe/app/command/update-recipe.command';

@Injectable()
export class RecipeService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async create(command: CreateRecipeDto) {
    return this.commandBus.execute(new RecipeCreateCommand(command));
  }

  async findBy(query: string) {
    return this.queryBus.execute(new FindRecipeByQuery(query));
  }

  async findAll() {
    return this.queryBus.execute(new FindAllRecipesQuery(1));
  }

  async findOne(id: number) {
    return this.queryBus.execute(new FindRecipeQuery(id));
  }
  update(id: number, updateRecipeDto: UpdateRecipeDto) {
    return this.commandBus.execute(new UpdateRecipeCommand(updateRecipeDto));
  }
  remove(id: number) {
    return this.queryBus.execute(new FindRecipeQuery(id));
  }
}
