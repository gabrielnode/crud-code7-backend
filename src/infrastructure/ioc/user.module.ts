import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from '../../presentation/controllers/user.controller';
import { UserUseCase } from '../../application/useCases/user.use.case';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../database/entities/user.entity';
import { AuthUseCase } from '../../application/useCases/auth.use.case';
import { AuthModule } from './auth.module';
import { AuthMiddleware } from '../../presentation/middlewares/auth.middleware';
import { UserRepository } from '../database/repositories/user.repository';
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]),AuthModule],
  controllers: [UserController],
  providers: [UserRepository,UserUseCase,AuthUseCase],
})
export class UserModule {}
//só comentar a linha acima e descomentar as demais abaixo para ativar auth nas rotas de user
//  export class UserModule implements NestModule {
//      configure(consumer: MiddlewareConsumer) {
//        consumer.apply(AuthMiddleware).forRoutes(UserController)
//      }
//  }
