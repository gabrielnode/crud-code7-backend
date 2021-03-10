import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserDto } from '../../../presentation/dtos/user.dto';

@Injectable()
export class UserRepository {
	constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}
	async findAll() {
		return await this.userRepository.find();
	}
	async create(userDto: UserDto) {
		return await this.userRepository.save(userDto);
	}
	async remove(id: string | number) {
		return await this.userRepository.delete(id);
    }
    async findOne(params) {
		return await this.userRepository.findOne(params);
	}
	async findOneByEmail(email: string) {
		return await this.userRepository.findOne({ email: email });
	}
}
