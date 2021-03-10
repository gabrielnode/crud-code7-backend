import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm"
import { ConfigService } from '@nestjs/config';
const databaseConfigs = (configService: ConfigService)=> ({
  type: 'sqlite',
  database: `${configService.get<string>('db_sqlite.SQLITE_DB_HOST')}/${configService.get<string>('db_sqlite.SQLITE_DB_NAME')}`,
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: false
}) as TypeOrmModuleAsyncOptions;

export default databaseConfigs;
