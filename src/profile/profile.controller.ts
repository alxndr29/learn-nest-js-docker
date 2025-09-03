import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ProfileService } from './profile.service';
import { createOrUpdateProfileDto } from './dto/createOrUpdateProfile.dto';
import { User } from '../auth/entities/user.entity';

@Controller('profile')
@UseGuards(AuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  async updateOrCreateProfile(
    @Request() req,
    @Body() createOrUpdateProfileDto: createOrUpdateProfileDto,
  ): Promise<{ message: string }> {
    return await this.profileService.updateOrCreateProfile(
      req.user.id,
      createOrUpdateProfileDto,
    );
  }

  @Get()
  async getUserProfile(@Request() req): Promise<User | null> {
    return await this.profileService.getUserProfileByToken(req.user.id);
  }

}
