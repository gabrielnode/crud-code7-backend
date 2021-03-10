import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { DebtEntity } from '../entities/debt.entity';
import { UserDto } from '../../../presentation/dtos/user.dto';
import { DebtDto } from '../../../presentation/dtos/debt.dto';

@Injectable()
export class DebtRepository {
	constructor(@InjectRepository(DebtEntity) private debtRepository: Repository<DebtEntity>) {}
	async findAll() {
		return await this.debtRepository.find();
	}
	async create(debtDto: DebtDto) {
		return await this.debtRepository.save(debtDto);
	}
	async remove(id: string | number) {
		return await this.debtRepository.delete(id);
    }
    async findOne(params) {
		return await this.debtRepository.findOne(params);
	}
	// async findOneByEmail(email: string) {
	// 	return await this.debtRepository.findOne({ email: email });
	// }
}
