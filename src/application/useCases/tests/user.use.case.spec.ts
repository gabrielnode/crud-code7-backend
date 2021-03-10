import { UserCRUDInfos } from './../../../application/interfaces/user.interface';
import * as faker from 'faker';
import { UserRepository } from '../../../infrastructure/database/repositories/user.repository';
import { UserUseCase } from '../user.use.case';
import { UserModel } from '../../../application/models/user.model';
import { Repository } from 'typeorm';
import { UserEntity } from '../../../infrastructure/database/entities/user.entity';
describe('User Use Case', () => {
	let userUseCase: UserUseCase;
	let userRepository: UserRepository;
	let user: UserModel;
	const users: UserModel[] = [];
	let userCRUDInfos: UserCRUDInfos ;
	const createRandomUserFactory = () =>
		new UserModel({
			id: faker.random.number(),
			name: faker.name.findName(),
			email: faker.internet.email(),
			password: faker.internet.password()
		});
	beforeEach(() => {
    userRepository = new UserRepository(new Repository<UserEntity>());
    userUseCase = new UserUseCase(userRepository);
		user = createRandomUserFactory();
		users.push(user);
	});

	describe('create', () => {
		it('should create an array of user', async () => {
      userCRUDInfos = { message: `user successfully added` , userId: user.id };
      const findOneUser = await jest.spyOn(userRepository, 'findOne').mockImplementation(async () => undefined);
      const createUserFn = await jest.spyOn(userRepository, 'create').mockImplementation(async () => user);
      const result = await userUseCase.create(user);
      expect(findOneUser).toBeCalled()
      expect(createUserFn).toBeCalled()
			expect(result).toStrictEqual(userCRUDInfos);
		});
	});
	describe('findAll', () => {
		it('should return an array of user', async () => {
			jest.spyOn(userRepository, 'findAll').mockImplementation(async () => users);
			expect(await userUseCase.findAll()).toBe(users);
		});
	});
});
