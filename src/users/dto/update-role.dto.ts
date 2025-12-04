import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../auth/enum/role.enum';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateRoleDto {
  @ApiProperty({ description: 'id' })
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}