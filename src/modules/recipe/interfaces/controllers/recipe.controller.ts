import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateRecipeDto } from '@src/modules/recipe/app/dtos/create-recipe.dto';
import { UpdateRecipeDto } from '@src/modules/recipe/app/dtos/update-recipe.dto';
import { SingleRecipeDto } from '@src/modules/recipe/app/dtos/single-recipe.dto';
import { RecipeService } from '@src/modules/recipe/app/service/recipe.service';
import { RecipeExceptionFilter } from '@src/modules/recipe/interfaces/filter/recipe-exception.filter';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { RecipeControllerInterface } from '@src/modules/recipe/interfaces/controllers/recipe.controller.interface';

@Controller('recipe')
@UseFilters(new RecipeExceptionFilter())
export class RecipeController implements RecipeControllerInterface {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Recipe created' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnprocessableEntityResponse({ description: 'Body validation Failed' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipeService.create(createRecipeDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Return all recipes',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async findAll() {
    return this.recipeService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Return a single recipe',
    type: SingleRecipeDto,
  })
  @ApiNotFoundResponse({ description: 'Recipe not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async findOne(@Param('id') id: number) {
    return await this.recipeService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Return a updated recipe',
    type: UpdateRecipeDto,
  })
  @ApiUnprocessableEntityResponse({ description: 'Body validation Failed' })
  @ApiNotFoundResponse({ description: 'Recipe not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  update(@Param('id') id: number, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipeService.update(id, updateRecipeDto);
  }

  @Delete(':id')
  @ApiNoContentResponse({ description: 'Recipe deleted' })
  @ApiNotFoundResponse({ description: 'Recipe not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number) {
    return this.recipeService.remove(id);
  }
}
