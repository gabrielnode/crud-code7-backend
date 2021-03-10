import { UserModel } from '../../../../application/models/user.model';
import { UserRepository } from '../user.repository';
import * as faker from 'faker';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';
describe('User Use Case', () => {
	let userRepository: UserRepository;
	let user: UserModel;
	const users: UserModel[] = [];
	const createRandomUserFactory = () =>
		new UserModel({
			id: faker.random.number(),
			name: faker.name.findName(),
			email: faker.internet.email(),
			password: faker.internet.password()
		});
	beforeEach(() => {
		userRepository = new UserRepository(new Repository<UserEntity>());
		user = createRandomUserFactory();
		users.push(user);
	});

	describe('create', () => {
		it('should create an array of user', async () => {
			const createUserFn = await jest.spyOn(userRepository, 'create').mockImplementation(async () => user);
			const result = await userRepository.create(user);
			expect(createUserFn).toBeCalled();
			expect(result).toStrictEqual(user);
		});
	});
	describe('findAll', () => {
		it('should return an array of user', async () => {
			jest.spyOn(userRepository, 'findAll').mockImplementation(async () => users);
			expect(await userRepository.findAll()).toBe(users);
		});
	});
});
