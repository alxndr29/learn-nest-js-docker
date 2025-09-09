import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { Article } from './entities/article.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Tag } from '../tag/entities/tag.entity';
import { ArticleTag } from '../articletag/entities/articletag.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Article, Tag, ArticleTag]), JwtModule],
  controllers: [ArticleController],
  providers: [ArticleService, CloudinaryService],
})
export class ArticleModule {}

