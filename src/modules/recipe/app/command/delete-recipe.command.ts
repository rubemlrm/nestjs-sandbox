import { ICommand } from '@nestjs/cqrs';

export class DeleteRecipeCommand implements ICommand {
  constructor(public readonly id: number) {}
}
