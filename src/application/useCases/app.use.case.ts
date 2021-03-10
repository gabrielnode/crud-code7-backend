import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { UtilsService } from '../../domain/shared/utils.service';
import systemEnvs from '../../infrastructure/configs/environment/system.envs';
import { AppLoggingDto } from '../../presentation/dtos/app.dto';

@Injectable()
export class AppUseCase {
  constructor(
    @Inject(systemEnvs.KEY) private sysConfig: ConfigType<typeof systemEnvs>,
    private readonly utilsService: UtilsService,
  ) {}
  rootPathMsg() {
    return {
      status: true,
      data: `root path`,
      api_version: this.sysConfig.API_VERSION,
      environment: process.env.NODE_ENV,
    };
  }
  getAppLoggingData(
    path: string,
    http_method: string,
    requester_ip: string,
    http_code,
  ): string {
    const loggingData = {
      server: this.utilsService.currentIpAddress(),
      method: http_method,
      statusCode: http_code,
      routePath: path,
      requestFrom: requester_ip,
      date: this.utilsService.current_date(),
    } as AppLoggingDto;
    return JSON.stringify(loggingData);
  }
}
