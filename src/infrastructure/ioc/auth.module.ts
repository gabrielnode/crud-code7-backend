import { Module } from '@nestjs/common';
import { AuthUseCase } from '../../application/useCases/auth.use.case';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { AuthController } from '../../presentation/controllers/auth.controller';
import { UserUseCase } from '../../application/useCases/user.use.case';
import { UserEntity } from '../database/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../database/repositories/user.repository';
import { DebtModule } from './debt.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule.register({})],
  providers: [UserRepository,AuthUseCase, UserUseCase, DebtModule],
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule {}
