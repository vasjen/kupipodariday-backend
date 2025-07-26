import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { HashModule } from '../hash/hash.module';

@Module({
  exports: [UsersService],
  imports: [TypeOrmModule.forFeature([User]), HashModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
