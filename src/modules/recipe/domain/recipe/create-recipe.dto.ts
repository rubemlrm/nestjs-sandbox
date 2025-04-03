import { IsString, IsOptional, Validate } from 'class-validator';
import { TitleExistsValidator } from '@src/modules/recipe/validators/unique-title.validator';

export class CreateRecipeDto {
  @IsString()
  @Validate(TitleExistsValidator)
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  ingredients: string;

  @IsString()
  instructions: string;
}
