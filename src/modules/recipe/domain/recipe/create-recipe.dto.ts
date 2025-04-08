import { IsString, IsOptional, Validate } from 'class-validator';
import { TitleExistsValidator } from '@src/modules/recipe/validators/unique-title.validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRecipeDto {
  @ApiProperty()
  @IsString()
  @Validate(TitleExistsValidator)
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsString()
  ingredients: string;

  @ApiProperty()
  @IsString()
  instructions: string;
}
