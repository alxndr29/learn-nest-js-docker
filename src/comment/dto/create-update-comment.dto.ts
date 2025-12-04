import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateUpdateCommentDto {
  @ApiProperty({ description: 'article id' })
  @IsNotEmpty()
  @IsUUID()
  articleId: string;

  @ApiProperty()
  @IsNotEmpty()
  content: string;
}
