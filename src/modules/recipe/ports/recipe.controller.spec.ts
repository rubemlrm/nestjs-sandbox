import { Test, TestingModule } from '@nestjs/testing';
import { RecipeController } from './recipe.controller';
import { RecipeService } from '../recipe.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { PrismaService } from '@src/prisma/prisma.service';
const moduleMocker = new ModuleMocker(global);

describe('RecipeController', () => {
  let controller: RecipeController;
  let service: RecipeService;
  let prismaService: PrismaService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipeController],
      providers: [PrismaService, RecipeService],
    }).compile();

    controller = module.get<RecipeController>(RecipeController);
    service = module.get<RecipeService>(RecipeService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('it should return a list of recipes', async () => {
    const result = [
      {
        id: 1,
        title: 'test',
        description: 'test',
        ingredients: 'test',
        instructions: 'test',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    jest.spyOn(service, 'findAll').mockResolvedValue(result);
    expect(await controller.findAll()).toBe(result);
    expect(service.findAll).toHaveBeenCalled();
  });
});
