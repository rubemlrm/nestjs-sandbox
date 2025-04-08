import { QueryBus, IQuery } from '@nestjs/cqrs';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggingQuerybus {
  private readonly logger = new Logger('QueryBus');

  constructor(private readonly queryBus: QueryBus) {}
  async execute<T extends IQuery>(query: T): Promise<any> {
    const queryName = query.constructor.name;
    this.logger.log(`Running Query: ${queryName}`);

    const start = Date.now();
    const result = await this.queryBus.execute(query);
    const duration = Date.now() - start;

    this.logger.log(`Query ${queryName} completed in ${duration}ms`);
    return result;
  }
}
