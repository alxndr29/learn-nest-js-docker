import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put, Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { createArticleDto } from './dto/create-article.dto';
import { FindOneParams } from './dto/find-one.params';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import { AuthGuard } from '../auth/guard/auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Role } from '../auth/enum/role.enum';
import { Roles } from '../auth/decolators/roles.decolator';
import { FileInterceptor } from '@nestjs/platform-express';
import { ArticleQueryDto } from './dto/article-query.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async findAll(@Query() query: ArticleQueryDto) {
    return await this.articleService.findAllArticle(query);
  }

  @Get('/:id')
  async findOne(@Param() params: FindOneParams): Promise<Article> {
    return await this.findOrFail(params.id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createArticleDto: createArticleDto,
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Article> {
    return await this.articleService.createArticle(
      req.user.id,
      createArticleDto,
      file,
    );
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Put('/:id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
    @Param() params: FindOneParams,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    const article = await this.findOrFail(params.id);
    return await this.articleService.updateArticleByParam(
      article,
      updateArticleDto,
      req.user.id,
      file,
    );
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async delete(@Request() req, @Param() params: FindOneParams): Promise<void> {
    const article = await this.findOrFail(params.id);
    await this.articleService.deleteArticleByParam(article, req.user.id);
  }

  private async findOrFail(id: string): Promise<Article> {
    const article = await this.articleService.findOneByParam(id);
    if (!article) {
      throw new NotFoundException();
    }
    return article;
  }
}
