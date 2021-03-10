// import { Controller } from '@nestjs/common';

// @Controller('debts')
// export class DebtsController {}

import { Body, Controller, Delete, Get, HttpStatus, Param, Post, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JoiValidationPipe } from '../../infrastructure/rest/pipes/joi.validation.pipe';
import { UserDto } from '../dtos/user.dto';
import { DebtDto } from '../dtos/debt.dto';
import { userJoiSchema } from '../../infrastructure/validators/user.joi.schema';
import { debtsoiSchema } from '../../infrastructure/validators/debts.joi.schema';

import { UserUseCase } from '../../application/useCases/user.use.case';
import { DebtUseCase } from '../../application/useCases/debt.use.case';
@ApiBearerAuth('jwt-access-token')
@ApiTags(`debts`)
@Controller('/api/v1/debts')
@ApiResponse({
	status: HttpStatus.UNAUTHORIZED,
	description: `<b>UNAUTHORIZED</b> - AUTHORIZATION_HEADER_NOT_FOUND`
})
@ApiResponse({
	status: HttpStatus.BAD_REQUEST,
	description: `<b>BAD REQUEST</b> - INVALID_JWT_TOKEN`
})
export class DebtsController {
	constructor(private readonly debtUseCase: DebtUseCase) {}
	@ApiOperation({ summary: 'get all users' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: `<b>OK</b>`
	})
	@Get('/')
	async findAll() {
		return await this.debtUseCase.findAll();
	}
	@ApiOperation({ summary: 'add user' })
	@Post('/')
	@ApiResponse({
		status: HttpStatus.CONFLICT,
		description: `<b>CONFLICT</b> - user email already registered`
	})
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: `<b>user successfully added</b>`
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: `<b>BAD REQUEST</b> - missing fields`
	})
	@UsePipes(new JoiValidationPipe(debtsoiSchema))
	async create(@Body() debtDto: DebtDto) {
		return await this.debtUseCase.create(debtDto);
	}

	@ApiOperation({ summary: 'delete user by id' })
	@Delete('/:id')
	@ApiParam({ name: 'id', required: true, type: () => Number })
	async remove(@Param('id') id: string | number) {
		return await this.debtUseCase.remove(id);
	}
	// @ApiOperation({ summary: 'get user by email' })
	// @Get('/:email')
	// @ApiParam({ name: 'email', required: true, type: () => String })
	// async findOneByEmail(@Param('email') email: string) {
	// 	return await this.debtUseCase.findOneByEmail(email);
	// }

	// @Delete('/:')
	// async delete(@Param('ajeitei') email: string) {
	// 	return await this.debtUseCase.findOneByEmail(email);
	// }
}
