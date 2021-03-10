import { Injectable } from '@nestjs/common';
import {
  UserNotAllowedException,
} from '../../domain/exceptions/user.exception';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { UserUseCase } from './user.use.case';

import { ConfigService } from '@nestjs/config';
import { UserAuthDto } from 'src/presentation/dtos/user.dto';
@Injectable()
export class AuthUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userUseCase: UserUseCase,
    private readonly configService: ConfigService
  ) {}
  async validateUser(userAuthDto: UserAuthDto) {
    const queryResult = await this.userUseCase.findOneByEmail(
      userAuthDto.email,
    );
    if (
      !queryResult ||
      queryResult.email !== userAuthDto.email ||
      queryResult.password !== userAuthDto.password
    )
      throw new UserNotAllowedException();
    else {
      return await this.generateJwtExpiresIn({ payload: queryResult }, '1h');
    }
  }
  async generateJwtExpiresIn(payload, time) {
    payload['token'] = `Bearer ${await this.jwtService.sign(payload, {expiresIn: time,secret: this.configService.get<string>('system.JWT_SECRET')})}`;
    return payload;
  }
  async verifyJwt(jwt) {
    return await this.jwtService.verify(jwt,{secret:this.configService.get<string>('system.JWT_SECRET')});
  }
}
