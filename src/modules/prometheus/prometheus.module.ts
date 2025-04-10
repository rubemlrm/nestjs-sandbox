import { Module } from '@nestjs/common';
import { PrometheusService } from '@src/modules/prometheus/app/service/prometheus.service';
import { PrometheusController } from '@src/modules/prometheus/ports/prometheus.controller';

@Module({
  providers: [PrometheusService],
  controllers: [PrometheusController],
})
export class PrometheusModule {}
