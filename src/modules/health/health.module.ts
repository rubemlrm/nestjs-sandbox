import { Module } from '@nestjs/common';
import { PrismaService } from '@src/modules/prisma/app/service/prisma.service';
import { HealthController } from '@src/modules/health/interfaces/health.controller';
import { HealthCheckService, TerminusModule } from '@nestjs/terminus';
import { HealthCheckExecutor } from '@nestjs/terminus/dist/health-check/health-check-executor.service';
import { Logger } from 'nestjs-pino';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TerminusModule, HttpModule],
  providers: [
    PrismaService,
    HealthCheckService,
    HealthCheckExecutor,
    {
      provide: 'TERMINUS_LOGGER', // Required by HealthCheckService
      useExisting: Logger, // Pino's Logger
    },
    {
      provide: 'TERMINUS_ERROR_LOGGER', // Required for error logging in Terminus
      useExisting: Logger,
    },
  ],
  controllers: [HealthController],
})
export class HealthModule {}
