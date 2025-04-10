import { ApiProperty } from '@nestjs/swagger';

export class SingleRecipeDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  ingredients: string;

  @ApiProperty()
  instructions: string;

  @ApiProperty()
  description: string;
}
