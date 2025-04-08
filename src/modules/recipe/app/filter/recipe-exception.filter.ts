import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { RecipeNotFoundException } from '../exception/recipe-not-found.exception';

@Catch(RecipeNotFoundException)
export class RecipeExceptionFilter implements ExceptionFilter {
  catch(exception: RecipeNotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(HttpStatus.NOT_FOUND).json({
      statusCode: HttpStatus.NOT_FOUND,
      message: exception.message,
      error: 'RecipeNotFoundException',
    });
  }
}
