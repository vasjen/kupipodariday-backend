import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigFactory } from 'src/config/jwt.config';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { HashModule } from 'src/hash/hash.module';
import { ConfigModule } from '@nestjs/config';
import config from 'src/config/config';

@Module({
  imports: [
    UsersModule, 
    HashModule, 
    PassportModule, 
    JwtModule.registerAsync({
      useClass: JwtConfigFactory
    }), 
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtConfigFactory]
})
export class AuthModule {}
