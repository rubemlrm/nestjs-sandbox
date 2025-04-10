import { Test, TestingModule } from '@nestjs/testing';
import { RecipeController } from './recipe.controller';
import { RecipeService } from '@src/modules/recipe/app/service/recipe.service';
import { CreateRecipeDto } from '@src/modules/recipe/app/dtos/create-recipe.dto';
import { UpdateRecipeDto } from '@src/modules/recipe/app/dtos/update-recipe.dto';

describe('RecipeController', () => {
  let controller: RecipeController;
  let service: RecipeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipeController],
      providers: [
        {
          provide: RecipeService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RecipeController>(RecipeController);
    service = module.get<RecipeService>(RecipeService);
  });

  it('creates a new recipe successfully', async () => {
    const createRecipeDto: CreateRecipeDto = {
      title: 'Title',
      ingredients: 'Ingredients',
      instructions: 'Instructions',
    };
    jest.spyOn(service, 'create').mockResolvedValue(createRecipeDto);

    const result = await controller.create(createRecipeDto);

    expect(result).toEqual(createRecipeDto);
    expect(service.create).toHaveBeenCalledWith(createRecipeDto);
  });

  it('finds all recipes successfully', async () => {
    const recipes = [
      {
        id: 1,
        title: 'Title',
        description: 'Description',
        ingredients: 'Ingredients',
        instructions: 'Instructions',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    jest.spyOn(service, 'findAll').mockResolvedValue(recipes);

    const result = await controller.findAll();

    expect(result).toEqual(recipes);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('finds a recipe by id successfully', async () => {
    const recipe = {
      id: 1,
      title: 'Title',
      ingredients: 'Ingredients',
      instructions: 'Instructions',
      description: 'Description',
    };
    jest.spyOn(service, 'findOne').mockResolvedValue(recipe);

    const result = await controller.findOne(1);

    expect(result).toEqual(recipe);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('throws exception when finding a non-existent recipe by id', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(null);

    const result = await controller.findOne(999);

    expect(result).toBeNull();
    expect(service.findOne).toHaveBeenCalledWith(999);
  });

  it('updates a recipe successfully', async () => {
    const updateRecipeDto: UpdateRecipeDto = {
      id: 1,
      title: 'Updated Title',
      ingredients: 'Updated Ingredients',
      instructions: 'Updated Instructions',
      description: 'Description',
    };
    jest.spyOn(service, 'update').mockResolvedValue(updateRecipeDto);

    const result = await controller.update(1, updateRecipeDto);

    expect(result).toEqual(updateRecipeDto);
    expect(service.update).toHaveBeenCalledWith(1, updateRecipeDto);
  });

  it('deletes a recipe successfully', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue(undefined);

    const result = await controller.remove(1);

    expect(result).toBeUndefined();
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
