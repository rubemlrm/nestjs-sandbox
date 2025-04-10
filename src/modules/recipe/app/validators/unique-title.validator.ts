import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { RecipeService } from '@src/modules/recipe/app/service/recipe.service';

@ValidatorConstraint({ name: 'TitleExists', async: true })
@Injectable()
export class TitleExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly recipeService: RecipeService) {}

  async validate(title: string) {
    const recipe = await this.recipeService.findBy(title);
    return !recipe;
  }

  defaultMessage(args: ValidationArguments) {
    return `Recipe with title ${args.value} already exist!`;
  }
}
