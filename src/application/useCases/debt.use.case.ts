import { Injectable } from '@nestjs/common';
import { UserAlreadyRegisteredException } from '../../domain/exceptions/user.exception';
import { DebtModel } from '../models/debt.model';
import { UserCRUDInfos } from '../interfaces/user.interface';
import { DebtCRUDInfos } from '../interfaces/debt.interface';
import { DebtRepository } from '../../infrastructure/database/repositories/debt.repository';
import { DebtDto } from 'src/presentation/dtos/debt.dto';

@Injectable()
export class DebtUseCase {
    constructor(private readonly debtRepository: DebtRepository) { }
    async findAll(): Promise<DebtModel[]> {
        return await this.debtRepository.findAll();
    }
    async create(debtDto: DebtModel): Promise<DebtCRUDInfos> {
        // const debt = await this.findOneByEmail(debtDto.user_id);
        // if (debt) throw new UserAlreadyRegisteredException();
        const createdDebt: DebtDto = await this.debtRepository.create(debtDto);
        return { debts: createdDebt, message: `user successfully added` } as DebtCRUDInfos;
    }
    async remove(id: string | number): Promise<UserCRUDInfos> {
        await this.debtRepository.remove(id);
        return { userId: id, message: `user successfully deleted` } as UserCRUDInfos;
    }
    // async findOneByEmail(id_user: number): Promise<DebtModel> {
    // 	return await this.debtRepository.findOne({ id_value: id_user });
    // }
}
