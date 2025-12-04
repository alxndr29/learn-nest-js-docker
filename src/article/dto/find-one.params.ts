import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class FindOneParams {
  @ApiProperty({ description: 'id' })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;
}
