export class UserModel {
	constructor(user: UserModel) {
		this.id = user.id;
		this.name = user.name;
		this.email = user.email;
		this.password = user.password;
        this.activated = user.activated ? user.activated : true;
        this.created_on = user.created_on ? user.created_on : new Date();
        this.updated_on = user.updated_on ? user.updated_on : new Date();
	}
	id: number;
	name: string;
	email: string;
	password: string;
	created_on?: Date;
	updated_on?: Date;
	activated?: boolean;
}
