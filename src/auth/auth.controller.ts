import { Controller, Post, Body, ValidationPipe, Get, Param, ParseIntPipe, UseInterceptors, ClassSerializerInterceptor, Headers, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';
import { User } from 'src/user/user.entity';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get("/:id")
  async getAuth(@Param('id', ParseIntPipe) id: number, @Headers('Authorization') authHeader: string): Promise<User | null> {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }
    const jwtToken = authHeader.split(' ')[1];
    return await this.authService.validateUserById(id, jwtToken);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  async register(@Body(new ValidationPipe()) registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
