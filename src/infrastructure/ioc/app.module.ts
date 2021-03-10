import { Module } from '@nestjs/common';
import { HttpExceptionFilterProvider } from '../rest/filters/http-exception.filter';
import { DataResponseInterceptorProvider } from '../rest/interceptors/data.response.interceptor';
import { UserModule } from './user.module';
import { AuthModule } from './auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfigs from '../configs/typeorm/database';
import sysEnvs from '../configs/environment/system.envs';
import servicesEnvs from '../configs/environment/request.envs';
import dbSqliteEnvs from '../configs/environment/db.sqlite.envs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomLogger } from '../../domain/shared/custom.logger';
import { UtilsService } from '../../domain/shared/utils.service';
import { AppUseCase } from '../../application/useCases/app.use.case';
import { LoggingInterceptorProvider } from '../rest/interceptors/logging.interceptor';
import { AppController } from '../../presentation/controllers/app.controller';
import { DebtModule } from './debt.module';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        databaseConfigs(configService),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    DebtModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `env-files/.config.${(process.env.NODE_ENV ||
        'development') as string}.env`,
      load: [sysEnvs, servicesEnvs, dbSqliteEnvs],
    }),
    CustomLogger,
 
  ],
  controllers: [AppController],
  providers: [
    AppUseCase,
    CustomLogger,
    UtilsService,
    LoggingInterceptorProvider,
    HttpExceptionFilterProvider,
    DataResponseInterceptorProvider,
  ],
})
export class AppModule {}
