import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  Matches,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Role } from '../enum/role.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @MinLength(8)
  @IsNotEmpty()
  @Matches(/[A-Z]/, {
    message: 'Password minimal ada huruf kapital',
  })
  @Matches(/[0-9]/, {
    message: 'Password minimal ada 1 angka',
  })
  @Matches(/[0-9]/, {
    message: 'Password minimal ada 1 karater spesial',
  })
  password: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role; // ← tidak wajib
}
