import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateRecipeDto } from '../domain/recipe/create-recipe.dto';
import { UpdateRecipeDto } from '../domain/recipe/update-recipe.dto';
import { RecipeService } from '@src/modules/recipe/service/recipe.service';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipeService.create(createRecipeDto);
  }

  @Get()
  async findAll() {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    console.log('findOne', id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    console.log('updateRecipeDto', updateRecipeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log('remove', id);
  }
}
