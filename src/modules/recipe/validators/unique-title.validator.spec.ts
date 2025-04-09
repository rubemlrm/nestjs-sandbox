import { TitleExistsValidator } from './unique-title.validator';
import { RecipeService } from '@src/modules/recipe/service/recipe.service';
import { ValidationArguments } from 'class-validator';

let validator: TitleExistsValidator;
let recipeService: jest.Mocked<RecipeService>;

beforeEach(() => {
  recipeService = {
    findBy: jest.fn(),
  } as any;

  validator = new TitleExistsValidator(recipeService);
});
describe('TitleExistsValidator', () => {
  it('validates successfully when title does not exist', async () => {
    jest.spyOn(recipeService, 'findBy').mockResolvedValue(null);

    const result = await validator.validate('Unique Title');

    expect(result).toBe(true);
  });

  it('fails validation when title already exists', async () => {
    jest
      .spyOn(recipeService, 'findBy')
      .mockResolvedValue({ id: 1, title: 'Duplicate Title' });

    const result = await validator.validate('Duplicate Title');

    expect(result).toBe(false);
  });

  it('returns default error message with the provided title', () => {
    const args = { value: 'Duplicate Title' } as ValidationArguments;

    const message = validator.defaultMessage(args);

    expect(message).toBe('Recipe with title Duplicate Title already exist!');
  });
});
