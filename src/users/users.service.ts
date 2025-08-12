import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>,
  ) {}

  async findAllUser(): Promise<User[]> {
    return await this.UserRepository.find();
  }

  async findByParams(id: string): Promise<User | null> {
    return await this.UserRepository.findOneBy({ id });
  }

  async updateRoleUser(
    user: User | null,
    updateRoleDto: UpdateRoleDto,
  ): Promise<User> {
    Object.assign(user, updateRoleDto);
    return await this.UserRepository.save(user);
  }
}
