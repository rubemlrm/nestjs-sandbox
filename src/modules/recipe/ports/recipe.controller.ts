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
//@UseInterceptors(CacheInterceptor)
export class RecipeController {
  //constructor(private readonly recipeService: RecipeService) { }

  @Post()
  create(@Body() createRecipeDto: CreateRecipeDto) {
    console.log('createRecipeDto', createRecipeDto);
    //return this.recipeService.create(createRecipeDto);
  }

  @Get()
  async findAll() {
    //return await this.recipeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    console.log('findOne', id);
    //return await this.recipeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    console.log('updateRecipeDto', updateRecipeDto);
    //return this.recipeService.update(+id, updateRecipeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log('remove', id);
    //return this.recipeService.remove(+id);
  }
}
