import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppUseCase } from '../../../application/useCases/app.use.case';
import { CustomLogger } from '../../../domain/shared/custom.logger';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    private readonly customLogger: CustomLogger,
    private readonly appUseCase: AppUseCase,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const [request, response] = context.getArgs();
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() =>
          this.customLogger.log(
            `${this.appUseCase.getAppLoggingData(
              <string>request.url,
              <string>request.method,
              <string>request.ip,
              <number>response.statusCode,
            )} +${Date.now() - now}ms`,
            'LoggingInterceptor',
          ),
        ),
      );
  }
}

export const LoggingInterceptorProvider = {
  provide: APP_INTERCEPTOR,
  useClass: LoggingInterceptor,
};
