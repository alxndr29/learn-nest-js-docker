import { Injectable } from '@nestjs/common';
import { createArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private ArticleRepository: Repository<Article>,
  ) {}
  async createArticle(createArticleDto: createArticleDto) {
    return await this.ArticleRepository.save(createArticleDto);
  }

  async findAllArticle(): Promise<Article[]> {
    return await this.ArticleRepository.find();
  }

  async findOneByParam(id: string): Promise<Article | null> {
    return await this.ArticleRepository.findOne({ where: { id } });
  }

  async updateArticleByParam(
    article: Article,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    Object.assign(article, updateArticleDto);
    return await this.ArticleRepository.save(article);
  }

  async deleteArticleByParam(articleData: Article): Promise<void> {
    await this.ArticleRepository.delete(articleData.id);
  }
}
