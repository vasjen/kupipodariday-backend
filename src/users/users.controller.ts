import { Controller, Get, Post, Body, Patch, Param, Req, UseInterceptors, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRequest } from './types/user-request';
import { User } from './entities/user.entity';
import { FindUsersDto } from './dto/find-users.dto';
import { Wish } from '../wishes/entities/wish.entity';
import { PasswordInterceptor } from '../auth/interceptors/password.interceptor';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('users')
@UseGuards(JwtGuard)
@UseInterceptors(PasswordInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getCurrentUser(@Req() req: UserRequest) {
    return await this.usersService.findById(req.user.id);
  }
  
  @Patch('me')
  async editCurrentUser(
    @Req() req: UserRequest,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.updateOne(req.user.id, updateUserDto);
  }

  @Get('me/wishes')
  async getCurrentUserWishes(@Req() req: UserRequest) {
    return await this.usersService.findWishes({ id: req.user.id });
  }

  @Get(':username')
  async getUserByUsername(@Param('username') username: string): Promise<User> {
    return await this.usersService.findByUsername(username);
  }
  
  @Get(':username/wishes')
  async getUserWishesByUsername(
    @Param('username') username: string,
  ): Promise<Wish[]> {
    return await this.usersService.findWishes({ username });
  }

  @Post('find')
  async findUsersByQuery(@Body() { query }: FindUsersDto): Promise<User[]> {
    return await this.usersService.findUsersByEmailOrUsername(query);
  }

}
