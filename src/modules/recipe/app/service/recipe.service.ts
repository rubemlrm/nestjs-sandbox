import { Injectable } from '@nestjs/common';
import { RecipeCreateCommand } from '@src/modules/recipe/app/command/create-recipe.command';
import { FindRecipeByQuery } from '@src/modules/recipe/app/query/find-recipe-by.query';
import { CreateRecipeDto } from '@src/modules/recipe/app/dtos/create-recipe.dto';
import { UpdateRecipeDto } from '@src/modules/recipe/app/dtos/update-recipe.dto';
import { FindRecipeQuery } from '@src/modules/recipe/app/query/find-recipe.query';
import { FindAllRecipesQuery } from '@src/modules/recipe/app/query/find-all-recipes-query';
import { UpdateRecipeCommand } from '@src/modules/recipe/app/command/update-recipe.command';
import { DeleteRecipeCommand } from '@src/modules/recipe/app/command/delete-recipe.command';
import { LoggingQuerybus } from '@src/modules/shared/logging/logging.querybus';
import { LoggingCommandbus } from '@src/modules/shared/logging/logging.commandbus';

@Injectable()
export class RecipeService {
  constructor(
    private readonly commandBus: LoggingCommandbus,
    private readonly queryBus: LoggingQuerybus,
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
    return this.commandBus.execute(
      new UpdateRecipeCommand(id, updateRecipeDto),
    );
  }
  remove(id: number) {
    return this.commandBus.execute(new DeleteRecipeCommand(id));
  }
}
