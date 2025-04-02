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

@Controller('recipe')
export class RecipeController {
  @Post()
  create(@Body() createRecipeDto: CreateRecipeDto) {
    console.log('createRecipeDto', createRecipeDto);
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
