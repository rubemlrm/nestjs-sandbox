import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
} from '@nestjs/common';
import { CreateRecipeDto } from '../domain/recipe/create-recipe.dto';
import { UpdateRecipeDto } from '../domain/recipe/update-recipe.dto';
import { RecipeService } from '@src/modules/recipe/service/recipe.service';
import { RecipeExceptionFilter } from '@src/modules/recipe/app/filter/recipe-exception.filter';

@Controller('recipe')
@UseFilters(new RecipeExceptionFilter())
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipeService.create(createRecipeDto);
  }

  @Get()
  async findAll() {
    return this.recipeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.recipeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipeService.update(id, updateRecipeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.recipeService.remove(id);
  }
}
