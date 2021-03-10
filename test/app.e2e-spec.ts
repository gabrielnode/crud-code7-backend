import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { UserModule } from '../src/infrastructure/ioc/user.module';
import databaseConfigs from '../src/infrastructure/configs/typeorm/database';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import sysConfig from '../src/infrastructure/configs/environment/system.envs';
import dbSqliteConfig from '../src/infrastructure/configs/environment/db.sqlite.envs';
import servicesConfig from '../src/infrastructure/configs/environment/request.envs';
import * as request from 'supertest';
import { UserEntity } from '../src/infrastructure/database/entities/user.entity';
import { AuthModule } from '../src/infrastructure/ioc/auth.module';
import * as faker from 'faker';
let app: INestApplication;
const userDto = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};
let createdUserId: number;
beforeAll(async () => {
  const module = await Test.createTestingModule({
    imports: [
      AuthModule,
      UserModule,
      ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: `env-files/.config.${(process.env.NODE_ENV || 'development') as string}.env`,
        load: [sysConfig, servicesConfig, dbSqliteConfig],
      }),
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) =>
          databaseConfigs(configService),
        inject: [ConfigService],
      }),
      TypeOrmModule.forFeature([UserEntity]),
    ],
  }).compile();
  app = module.createNestApplication();
  await app.init();
});
test('/api/v1/user (POST)', async () => {
  const { body } = await request(app.getHttpServer())
    .post('/api/v1/user')
    .send(userDto)
    .expect(HttpStatus.CREATED)
    .set('Accept', 'application/json');
  createdUserId = body.userId;
  console.log(body);
});
test('/api/v1/user (GET)', async () => {
  const { body } = await request(app.getHttpServer())
    .get('/api/v1/user')
    .expect(HttpStatus.OK)
    .set('Accept', 'application/json');
  console.log(body);
});
test('/api/v1/authenticate (POST)', async () => {
  const { password, email} = userDto
  const { body } = await request(app.getHttpServer())
    .post('/api/v1/authenticate')
    .send({ password, email})
    .expect(HttpStatus.OK)
    .set('Accept', 'application/json');
  console.log(body);
});
test('/api/v1/user/:id (DELETE)', async () => {
  const { body } = await request(app.getHttpServer())
    .delete(`/api/v1/user/${createdUserId}`)
    .send(userDto)
    .expect(HttpStatus.OK)
    .set('Accept', 'application/json');
  console.log(body);
});
afterAll(async () => {
  await app.close();
});
