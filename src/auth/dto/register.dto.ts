import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  Matches,
  IsEnum,
} from 'class-validator';
import { Role } from '../enum/role.enum';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

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

  @IsEnum(Role)
  role: Role;
}
