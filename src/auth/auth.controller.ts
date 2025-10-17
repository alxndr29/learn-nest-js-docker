import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import { RolesGuard } from './guard/roles.guard';
import { Roles } from './decolators/roles.decolator';
import { Role } from './enum/role.enum';
import { AuthGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.registerUser({
      ...registerDto,
      role: Role.USER,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.loginUser(loginDto);
  }

  @UseGuards(AuthGuard)
  @Get('getuser')
  async getUser(@Request() request): Promise<User | null> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
    return await this.authService.getUser(request.user.id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('test')
  getTest(): { message: string } {
    return {
      message: 'Hello World',
    };
  }
}
