import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './infrastructure/ioc/app.module';
import { CustomLogger } from './domain/shared/custom.logger';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());
  const systemConfig: ConfigService = app.get(ConfigService);
  const options = new DocumentBuilder()
    .setTitle('Nestjs Clean Architecture')
    .addBearerAuth({type:"apiKey", scheme:'bearer',bearerFormat:'JWT', name:"Authorization", in:"header"},'jwt-access-token')
    .addTag(systemConfig.get<string>('system.API_VERSION'))
    .setDescription('Sample API template')
    .setVersion(systemConfig.get<string>('system.API_VERSION'))
    .build();
  const document = SwaggerModule.createDocument(app, options);
  
  SwaggerModule.setup(systemConfig.get<string>('system.API_DOC_ENDPOINT'), app, document);
  const logger: CustomLogger = app.get(CustomLogger);

  await app.listen(systemConfig.get<number>('system.SERVER_PORT'), ()=>{
    logger.log(`API running in '${systemConfig.get<number>('system.NODE_ENV')}' environment`,'AppConfiguration')
    logger.log(`API running on port ${systemConfig.get<number>('system.SERVER_PORT')}`,'AppConfiguration')
  });
}
bootstrap();
