import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { APP_FILTER } from '@nestjs/core';
import systemEnvs from '../../configs/environment/system.envs';
import { ConfigType } from '@nestjs/config';
import { CustomLogger } from '../../../domain/shared/custom.logger';
import { AppUseCase } from '../../../application/useCases/app.use.case';
export interface ICustomResponseData {
  http_code: number;
  timestamp: string;
  path: string;
  http_method: string;
  error?: any;
  data?: any;
  stack?: any;
}
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(systemEnvs.KEY) private sysEnvs: ConfigType<typeof systemEnvs>,
    private readonly customLogger: CustomLogger,
    private readonly appUseCase: AppUseCase,
  ) {}
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = <any>exception.getResponse();
    if (exceptionResponse['statusCode']) delete exceptionResponse['statusCode'];
    const responseData = {
      http_code: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      http_method: request.method,
      error: exceptionResponse,
      stack:
        this.sysEnvs.NODE_ENV === 'development' ? exception.stack : undefined,
    } as ICustomResponseData;
    const { stack, ...loggingErrorData } = responseData;
    this.customLogger.log(
      this.appUseCase.getAppLoggingData(
        responseData.path,
        responseData.http_method,
        request.ip,
        responseData.http_code,
      ),
      'HttpExceptionFilter',
    );
    this.customLogger.error(
      JSON.stringify(loggingErrorData),
      stack,
      'HttpExceptionFilter',
    );
    response.status(status).json(responseData);
  }
}

export const HttpExceptionFilterProvider = {
  provide: APP_FILTER,
  useClass: HttpExceptionFilter,
};
