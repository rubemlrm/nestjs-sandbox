import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RecipeCreateCommand } from '@src/modules/recipe/app/command/create-recipe.command';
import { FindRecipeByQuery } from '@src/modules/recipe/app/query/find-recipe-by.query';
import { CreateRecipeDto } from '../domain/recipe/create-recipe.dto';
import { UpdateRecipeDto } from '../domain/recipe/update-recipe.dto';

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
    console.log('findAll');
  }

  async findOne(id: string) {
    console.log('findOne', id);
  }
  update(id: string, updateRecipeDto: UpdateRecipeDto) {
    console.log('updateRecipeDto', updateRecipeDto);
  }
  remove(id: string) {
    console.log('remove', id);
  }
}
