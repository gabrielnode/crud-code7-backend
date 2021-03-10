import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserUseCase } from '../../application/useCases/user.use.case';
import { AuthorizationNotFoundException } from '../../domain/exceptions/header.exception';
import { AuthUseCase } from '../../application/useCases/auth.use.case';
import { InvalidJwtToken } from '../../domain/exceptions/jwt.exceptions';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private userUseCase: UserUseCase,
    private readonly authUseCase: AuthUseCase,
  ) {}
  async use(req: Request, res: Response, next: any) {
    const headers = req.headers 
    if (!headers['authorization']) throw new AuthorizationNotFoundException();
    await this.authUseCase
      .verifyJwt(headers['authorization'].replace('Bearer ', ''))
      .then(() => next())
      .catch(jwtError => {
        throw new InvalidJwtToken(jwtError.message);
      });
  }
}
