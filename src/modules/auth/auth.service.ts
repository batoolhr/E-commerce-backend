import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { password, ...userData } = registerDto;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user with hashed password
    const newUser = await this.usersService.create({
      ...userData,
      password: hashedPassword,
    });

    return await this.login({
      username: newUser.username,
      password: registerDto.password,
    });
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    // Find user by username
    let user = await this.usersService.findByUsername(username);

    if (!user) {
      user = await this.usersService.findByEmail(username);

      if (!user) throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const payload = { username: user.username, sub: user._id };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    };
  }
}
