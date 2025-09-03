import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../auth/entities/user.entity';

import { RolesGuard } from '../auth/guard/roles.guard';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Roles } from '../auth/decolators/roles.decolator';
import { Role } from '../auth/enum/role.enum';
import { FindOneParams } from './dto/find-one.params';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  async findAllUser(): Promise<User[]> {
    return await this.userService.findAllUser();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch('/:id')
  async update(
    @Param() params: FindOneParams,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<{ message: string }> {
    const user = await this.findOneById(params.id);
    await this.userService.updateRoleUser(user, updateRoleDto);
    return {
      message: "Role berhasil dirubah"
    };
  }

  private async findOneById(id: string): Promise<User | null> {
    const user = await this.userService.findByParams(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }
}
