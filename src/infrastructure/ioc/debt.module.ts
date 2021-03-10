import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DebtsController } from '../../presentation/controllers/debts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebtEntity } from '../database/entities/debt.entity';
import { DebtRepository } from '../database/repositories/debt.repository';
import { DebtUseCase } from 'src/application/useCases/debt.use.case';
@Module({
  imports: [TypeOrmModule.forFeature([DebtEntity])],
  controllers: [DebtsController],
  providers: [DebtRepository, DebtUseCase],
})
export class DebtModule {}