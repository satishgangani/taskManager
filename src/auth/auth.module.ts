import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { JwtStrategy } from './auth.strategies';
import { AuthGuard } from 'src/guards/auth.guard';

@Module({
  imports:[ TypeOrmModule.forFeature([User]),
    PassportModule,JwtModule.register({secret: 'e9c280422cb57291af4bf7ff1bbd223572fdd39c9e659e0d6cc1833087eaa1e9',signOptions: { expiresIn: '24h' }, }),],
  controllers: [AuthController],
  providers: [AuthService , JwtStrategy , AuthGuard]
})
export class AuthModule {}
