import { Test, TestingModule } from '@nestjs/testing';
import { RecipeService } from './recipe.service';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RecipeCreateCommand } from '@src/modules/recipe/app/command/create-recipe.command';
import { FindRecipeByQuery } from '@src/modules/recipe/app/query/find-recipe-by.query';
import { CreateRecipeDto } from '../domain/recipe/create-recipe.dto';
import { UpdateRecipeDto } from '../domain/recipe/update-recipe.dto';
import { FindRecipeQuery } from '@src/modules/recipe/app/query/find-recipe.query';
import { FindAllRecipesQuery } from '@src/modules/recipe/app/query/find-all-recipes-query';
import { UpdateRecipeCommand } from '@src/modules/recipe/app/command/update-recipe.command';
import { RecipeNotFoundException } from '@src/modules/recipe/app/exception/recipe-not-found.exception';
import { DeleteRecipeCommand } from '@src/modules/recipe/app/command/delete-recipe.command';
import { LoggingCommandbus } from '@src/modules/common/logging/logging.commandbus';
import { LoggingQuerybus } from '@src/modules/common/logging/logging.querybus';

describe('RecipeService', () => {
  let service: RecipeService;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecipeService,
        LoggingCommandbus,
        LoggingQuerybus,
        {
          provide: CommandBus,
          useValue: { execute: jest.fn() },
        },
        {
          provide: QueryBus,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<RecipeService>(RecipeService);
    commandBus = module.get<CommandBus>(CommandBus);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  it('creates a new recipe successfully', async () => {
    const createRecipeDto: CreateRecipeDto = {
      title: 'Title',
      ingredients: 'Ingredients',
      instructions: 'Instructions',
    };
    const command = new RecipeCreateCommand(createRecipeDto);
    jest.spyOn(commandBus, 'execute').mockResolvedValue(createRecipeDto);

    const result = await service.create(createRecipeDto);

    expect(result).toEqual(createRecipeDto);
    expect(commandBus.execute).toHaveBeenCalledWith(command);
  });

  it('finds a recipe by query successfully', async () => {
    const query = 'query';
    const findRecipeByQuery = new FindRecipeByQuery(query);
    const recipe = {
      id: 1,
      title: 'Title',
      ingredients: 'Ingredients',
      instructions: 'Instructions',
    };
    jest.spyOn(queryBus, 'execute').mockResolvedValue(recipe);

    const result = await service.findBy(query);

    expect(result).toEqual(recipe);
    expect(queryBus.execute).toHaveBeenCalledWith(findRecipeByQuery);
  });

  it('finds a recipe by query failed', async () => {
    jest
      .spyOn(queryBus, 'execute')
      .mockRejectedValue(new RecipeNotFoundException(1));
    await expect(service.findBy('1')).rejects.toThrow(RecipeNotFoundException);
  });

  it('finds all recipes successfully', async () => {
    const findAllRecipesQuery = new FindAllRecipesQuery(1);
    const recipes = [
      {
        id: 1,
        title: 'Title',
        ingredients: 'Ingredients',
        instructions: 'Instructions',
      },
    ];
    jest.spyOn(queryBus, 'execute').mockResolvedValue(recipes);

    const result = await service.findAll();

    expect(result).toEqual(recipes);
    expect(queryBus.execute).toHaveBeenCalledWith(findAllRecipesQuery);
  });

  it('finds a recipe by id successfully', async () => {
    const id = 1;
    const findRecipeQuery = new FindRecipeQuery(id);
    const recipe = {
      id: 1,
      title: 'Title',
      ingredients: 'Ingredients',
      instructions: 'Instructions',
    };
    jest.spyOn(queryBus, 'execute').mockResolvedValue(recipe);

    const result = await service.findOne(id);

    expect(result).toEqual(recipe);
    expect(queryBus.execute).toHaveBeenCalledWith(findRecipeQuery);
  });

  it('updates a recipe successfully', async () => {
    const id = 1;
    const updateRecipeDto: UpdateRecipeDto = {
      id: id,
      title: 'Updated Title',
      ingredients: 'Updated Ingredients',
      instructions: 'Updated Instructions',
    };
    const command = new UpdateRecipeCommand(id, updateRecipeDto);
    jest.spyOn(commandBus, 'execute').mockResolvedValue(updateRecipeDto);

    const result = await service.update(id, updateRecipeDto);

    expect(result).toEqual(updateRecipeDto);
    expect(commandBus.execute).toHaveBeenCalledWith(command);
  });

  it('deletes a recipe successfully', async () => {
    const id = 1;
    const deleteRecipeCommand = new DeleteRecipeCommand(id);
    jest.spyOn(commandBus, 'execute').mockResolvedValue(undefined);

    const result = await service.remove(id);

    expect(result).toBeUndefined();
    expect(commandBus.execute).toHaveBeenCalledWith(deleteRecipeCommand);
  });

  it("throw exception on recipe delete if recipe doesn't exist.", async () => {
    jest
      .spyOn(commandBus, 'execute')
      .mockRejectedValue(new RecipeNotFoundException(1));
    await expect(service.remove(1)).rejects.toThrow(RecipeNotFoundException);
  });

  it("throw generic exception on recipe delete if recipe doesn't exist.", async () => {
    jest
      .spyOn(commandBus, 'execute')
      .mockRejectedValue(new Error(`Error deleting recipe: 1`));
    await expect(service.remove(1)).rejects.toThrow(
      new Error(`Error deleting recipe: 1`),
    );
  });
});
