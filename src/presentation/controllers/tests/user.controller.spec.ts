import { UserController } from '../user.controller';
import { UserUseCase } from '../../../application/useCases/user.use.case';
import { UserModel } from '../../../application/models/user.model';
import * as faker from 'faker';
import { UserRepository } from '../../../infrastructure/database/repositories/user.repository';
import { UserCRUDInfos } from '../../../application/interfaces/user.interface';
describe('UserController', () => {
	let userController: UserController;
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
		userUseCase = new UserUseCase(userRepository);
		userController = new UserController(userUseCase);
		user = createRandomUserFactory();
		users.push(user);
	});

	describe('create', () => {
		it('should create an array of user', async () => {
			userCRUDInfos = { userId: user.id, message : `user successfully added` };
			jest.spyOn(userUseCase, 'create').mockImplementation(async () => userCRUDInfos);
			expect(await userController.create(user)).toBe(userCRUDInfos);
		});
	});
	describe('findAll', () => {
		it('should return an array of user', async () => {
			jest.spyOn(userUseCase, 'findAll').mockImplementation(async () => users);
			expect(await userController.findAll()).toBe(users);
		});
	});
});
