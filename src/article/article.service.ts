import { ForbiddenException, Injectable } from '@nestjs/common';
import { createArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private ArticleRepository: Repository<Article>,
    private CloudinaryService: CloudinaryService,
  ) {}

  async createArticle(
    userId: string,
    createArticleDto: createArticleDto,
    file?: Express.Multer.File,
  ): Promise<Article> {
    let image: string | undefined;
    if (file) {
      image = await this.CloudinaryService.uploadImageStream(file);
    }

    const newArticle = await this.ArticleRepository.save({
      ...createArticleDto,
      image,
      userId,
    });
    return this.ArticleRepository.save(newArticle);
  }

  async findAllArticle(): Promise<Article[]> {
    return await this.ArticleRepository.find();
  }

  async findOneByParam(id: string): Promise<Article | null> {
    return await this.ArticleRepository.findOne({
      where: { id },
      relations: ['category', 'user'],
      select: {
        category: {
          id: true,
          name: true,
        },
        user: {
          id: true,
          name: true,
          email: true,
          role: true,
        }
      },
    });
  }

  async updateArticleByParam(
    article: Article,
    updateArticleDto: UpdateArticleDto,
    userId: string,
    file?: Express.Multer.File,
  ): Promise<Article> {
    const currentUser = await this.ArticleRepository.findOne({
      where: { userId: userId },
    });
    if (!currentUser) {
      throw new ForbiddenException();
    }
    if (file) {
      article.image = await this.CloudinaryService.uploadImageStream(file);
    }
    Object.assign(article, updateArticleDto);
    return await this.ArticleRepository.save(article);
  }

  async deleteArticleByParam(
    articleData: Article,
    userId: string,
  ): Promise<void> {
    const currentUser = await this.ArticleRepository.findOne({
      where: { userId: userId },
    });
    if (!currentUser) {
      throw new ForbiddenException();
    }
    await this.ArticleRepository.delete(articleData.id);
  }
}
