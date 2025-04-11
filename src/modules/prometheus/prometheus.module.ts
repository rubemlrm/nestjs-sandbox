import { Module } from '@nestjs/common';
import { PrometheusService } from '@src/modules/prometheus/app/service/prometheus.service';
import { PrometheusController } from '@src/modules/prometheus/interfaces/prometheus.controller';
import { PrismaService } from '@src/modules/prisma/app/service/prisma.service';
@Module({
  providers: [PrometheusService, PrismaService],
  controllers: [PrometheusController],
})
export class PrometheusModule {}
