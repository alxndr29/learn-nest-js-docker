import { ArticleStatus } from '../interface/article.interface';
import { IsNotEmpty, IsString, IsEnum, IsUUID } from 'class-validator';
export class createArticleDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsEnum(ArticleStatus)
  status: ArticleStatus;

  @IsNotEmpty()
  @IsUUID()
  categoryId: string;
}
