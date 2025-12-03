import { Injectable, NotFoundException } from '@nestjs/common';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { createOrUpdateProfileDto } from './dto/createOrUpdateProfile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async updateOrCreateProfile(
    userId: string,
    createOrUpdateProfileDto: createOrUpdateProfileDto,
  ): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['profile'],
    });

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    if (user.profile) {
      Object.assign(user.profile, createOrUpdateProfileDto);
      await this.profileRepository.save(user.profile);
    } else {
      const newProfile = this.profileRepository.create(
        createOrUpdateProfileDto,
      );
      newProfile.user = user;
      await this.profileRepository.save(newProfile);
      return {
        message: `Profile created successfully.`,
      };
    }
    return {
      message: `Profile created successfully.`,
    };
  }

  async getUserProfileByToken(userId: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['profile'],
      select: {
        id: true,
        name: true,
        email: true,
        profile: {
          age: true,
          bio: true,
        },
      },
    });
    return user;
  }
}
