import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { PrometheusService } from '../app/service/prometheus.service';
import { PrismaService } from '@src/modules/prisma/app/service/prisma.service';
@Controller('metrics')
export class PrometheusController {
  constructor(
    private readonly prometheusService: PrometheusService,
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  async getMetrics(@Res() res: Response) {
    const appMetrics = await this.prometheusService.getMetrics();
    const prismaMetrics = await this.prismaService.$metrics.prometheus();
    res.setHeader('Content-Type', 'text/plain');
    res.send(appMetrics + prismaMetrics);
  }
}
