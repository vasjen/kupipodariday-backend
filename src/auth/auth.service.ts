import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { HashService } from 'src/hash/hash.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private hashService: HashService,
    private jwtService: JwtService,
  ) {}

  auth(user: User) {
    const payload = { sub: user.id };

    return { access_token: this.jwtService.sign(payload) };
  }

  async validateUserCredentials(
    username: string,
    password: string,
  ): Promise<null | User> {
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      return null;
    }

    const hasMatch = await this.hashService.compare(password, user.password);

    if (!hasMatch) {
      throw new UnauthorizedException('Неверные учетные данные');
    }

    return user;
  }
}
