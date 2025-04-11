import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import {
  HealthCheckService,
  HttpHealthIndicator,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import { PrismaService } from '@src/modules/prisma/app/service/prisma.service';

describe('HealthController', () => {
  let healthController: HealthController;
  let healthCheckService: HealthCheckService;
  let httpHealthIndicator: HttpHealthIndicator;
  let prismaHealthIndicator: PrismaHealthIndicator;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: HealthCheckService,
          useValue: { check: jest.fn() },
        },
        {
          provide: HttpHealthIndicator,
          useValue: {},
        },
        {
          provide: PrismaHealthIndicator,
          useValue: { pingCheck: jest.fn() },
        },
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    }).compile();

    healthController = module.get<HealthController>(HealthController);
    healthCheckService = module.get<HealthCheckService>(HealthCheckService);
    httpHealthIndicator = module.get<HttpHealthIndicator>(HttpHealthIndicator);
    prismaHealthIndicator = module.get<PrismaHealthIndicator>(
      PrismaHealthIndicator,
    );
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('returns an empty array for liveness check', async () => {
    (healthCheckService.check as jest.Mock).mockResolvedValueOnce([]);

    const result = await healthController.checkLiveness();

    expect(healthCheckService.check).toHaveBeenCalledWith([]);
    expect(result).toEqual([]);
  });

  it('returns database readiness status', async () => {
    const mockResult = [{ database: { status: 'up' } }];
    (prismaHealthIndicator.pingCheck as jest.Mock).mockResolvedValueOnce(
      mockResult[0],
    );
    (healthCheckService.check as jest.Mock).mockResolvedValueOnce(mockResult);

    const result = await healthController.checkReadiness();

    expect(healthCheckService.check).toHaveBeenCalledWith([
      expect.any(Function),
    ]);
    expect(result).toEqual(mockResult);
  });

  it('throws an error if database readiness check fails', async () => {
    const mockError = new Error('Database is down');
    (prismaHealthIndicator.pingCheck as jest.Mock).mockRejectedValueOnce(
      mockError,
    );
    (healthCheckService.check as jest.Mock).mockImplementationOnce(
      async (checks) => {
        for (const check of checks) {
          await check();
        }
      },
    );

    await expect(healthController.checkReadiness()).rejects.toThrow(
      'Database is down',
    );
    expect(healthCheckService.check).toHaveBeenCalledWith([
      expect.any(Function),
    ]);
  });
});
