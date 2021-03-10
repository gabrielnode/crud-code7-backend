export class DebtModel {
	constructor(user: DebtModel) {
		this.id = user.id;
		this.user_id = user.user_id;
		this.motivation_debt = user.motivation_debt;
		this.value = user.value;
        this.date_debt = user.date_debt;
        this.created_on = user.created_on ? user.created_on : new Date();
        this.updated_on = user.updated_on ? user.updated_on : new Date();
	}
	id: number;
	user_id: number;
    user_name: string;
	motivation_debt: string;
	value: string;
	date_debt: Date;
	created_on?: Date;
	updated_on?: Date;
}
