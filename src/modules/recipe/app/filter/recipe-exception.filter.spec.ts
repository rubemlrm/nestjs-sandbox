import { RecipeNotFoundException } from '@src/modules/recipe/app/exception/recipe-not-found.exception';
import { ArgumentsHost, HttpStatus } from '@nestjs/common';
import { RecipeExceptionFilter } from '@src/modules/recipe/app/filter/recipe-exception.filter';

let filter: RecipeExceptionFilter;
let mockArgumentsHost: jest.Mocked<ArgumentsHost>;
let mockResponse: any;

describe('RecipeExceptionFilter', () => {
  beforeEach(() => {
    filter = new RecipeExceptionFilter();
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockArgumentsHost = {
      switchToHttp: jest.fn().mockReturnValue({
        getResponse: jest.fn().mockReturnValue(mockResponse),
      }),
    } as any;
  });

  it('returns 404 status and default error details when exception message is undefined', () => {
    const exception = new RecipeNotFoundException(1);

    filter.catch(exception, mockArgumentsHost);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    expect(mockResponse.json).toHaveBeenCalledWith({
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Recipe with ID 1 not found',
      error: 'RecipeNotFoundException',
    });
  });
});
