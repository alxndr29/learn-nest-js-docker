import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ArticleStatus } from '../interface/article.interface';
import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class createArticleDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  content: string;

  @IsNotEmpty()
  @IsEnum(ArticleStatus)
  @ApiProperty({ enum: ArticleStatus })
  status: ArticleStatus;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  categoryId: string;

  @IsOptional()
  @ApiPropertyOptional({ type: 'array', items: { type: 'string' } })
  tags?: string[];

  @IsOptional()
  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  image?: any
}
