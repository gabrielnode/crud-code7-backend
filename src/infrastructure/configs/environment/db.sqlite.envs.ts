import { registerAs } from '@nestjs/config';

export default registerAs('db_sqlite', () => ({
  SQLITE_DB_HOST: process.env.SQLITE_DB_HOST,
  SQLITE_DB_NAME: process.env.SQLITE_DB_NAME,
}));
