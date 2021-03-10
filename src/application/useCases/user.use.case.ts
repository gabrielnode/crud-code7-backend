import { Injectable } from '@nestjs/common';
import { UserAlreadyRegisteredException } from '../../domain/exceptions/user.exception';
import { UserDto } from '../../presentation/dtos/user.dto';
import { UserModel } from '../models/user.model';
import {  UserCRUDInfos } from '../interfaces/user.interface';
import { UserRepository } from '../../infrastructure/database/repositories/user.repository';

@Injectable()
export class UserUseCase {
	constructor(private readonly userRepository: UserRepository) {}
	async findAll(): Promise<UserModel[]> {
		return await this.userRepository.findAll();
	}
	async create(userDto: UserDto): Promise<UserCRUDInfos> {
		const user = await this.findOneByEmail(userDto.email);
		if (user) throw new UserAlreadyRegisteredException();
		const createdUser: UserDto = await this.userRepository.create(userDto);
		return { userId: createdUser.id, message: `user successfully added` } as UserCRUDInfos;
	}
	async remove(id: string | number): Promise<UserCRUDInfos> {
		await this.userRepository.remove(id);
		return { userId: id, message: `user successfully deleted` } as UserCRUDInfos;
	}
	async findOneByEmail(email: string): Promise<UserModel> {
		return await this.userRepository.findOne({ email: email });
	}
}
