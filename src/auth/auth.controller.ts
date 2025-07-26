import { Controller, Post, Body, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserRequest } from 'src/users/types/user-request';
import { LocalGuard } from './guards/local.guard';
import { PasswordInterceptor } from './interceptors/password.interceptor';

@Controller()
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  @Post('signin')
  @UseGuards(LocalGuard)
  signin(@Req() req: UserRequest) {
    return this.authService.auth(req.user);
  }

  @Post('signup')
  @UseInterceptors(PasswordInterceptor)
  signup(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
