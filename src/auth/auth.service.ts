import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './auth.dto';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtService: JwtService) { }

  //Login User

  async login(loginDto: LoginDto): Promise<{ message: string, Token: string }> {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, role : user.role, username:user.username };

    const accessToken = this.generateToken(payload);
    return {
      message: `Welcome , ${user.username}`,
      Token: accessToken
    };
  }


  // Register a new user

  async register(registerDto: RegisterDto): Promise<{ message: string, username: string, email: string }> {
    const { email, password } = registerDto;

    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({ ...registerDto, password: hashedPassword });
    await this.userRepository.save(newUser);

    return {
      message: "Registration successful",
      username: newUser.username,
      email: newUser.email
    };
  }

  private generateToken(payload): string {
   
    return this.jwtService.sign(payload);
  }

  verifyToken(token: string): { userId: number } {
    try {
      const decodedToken = this.jwtService.verify(token);
      return { userId: decodedToken.sub };
    } catch (error) {
      throw new NotFoundException('Invalid token');
    }
  }

  //Validate the user with TOKEN
  async validateUserById(userId: number, jwtToken: string): Promise<User | null> {
    // Verify the JWT token to get the user's ID
    const decodedToken = this.verifyToken(jwtToken);
    const currentUserId = decodedToken.userId;
  
    // Fetch the user from the database
    const user = await this.userRepository.findOne({ where: { id: userId } });
  
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.id !== currentUserId) {
      throw new UnauthorizedException("You are not authorized to view this."); 
    }
    return user;
  }
  
}
