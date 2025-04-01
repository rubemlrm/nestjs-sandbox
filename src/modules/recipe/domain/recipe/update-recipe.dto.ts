import { PartialType } from '@nestjs/swagger';
import { CreateRecipeDto } from './create-recipe.dto';
import { IsString } from 'class-validator';

export class UpdateRecipeDto extends PartialType(CreateRecipeDto) {
  id: number;
}
