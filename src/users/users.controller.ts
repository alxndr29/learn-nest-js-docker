import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../auth/entities/user.entity';

import { RolesGuard } from '../auth/guard/roles.guard';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Roles } from '../auth/decolators/roles.decolator';
import { Role } from '../auth/enum/role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService){}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  async findAllUser(): Promise<User[]> {
    return await this.userService.findAllUser()
  }
}
