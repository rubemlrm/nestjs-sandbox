import { CommandBus, ICommand } from '@nestjs/cqrs';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggingCommandbus {
  private readonly logger = new Logger('CommandBus');
  constructor(private readonly commandBus: CommandBus) {}
  async execute<T extends ICommand>(command: T): Promise<any> {
    const commandName = command.constructor.name;
    this.logger.log(`Executing Command: ${commandName}`);

    try {
      const start = Date.now();
      const result = await this.commandBus.execute(command);
      const duration = Date.now() - start;
      this.logger.log(`Command ${commandName} completed in ${duration}ms`);
      return result;
    } catch (error) {
      this.logger.warn(`Error logging command ${commandName}: ${error}`);
      throw error;
    }
  }
}
