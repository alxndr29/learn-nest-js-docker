import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ArticleService } from './article.service';
import { createArticleDto } from './dto/create-article.dto';
import { IArticle } from './interface/article.interface';
import { FindOneParams } from './dto/find-one.params';
import { UpdateArticleDto } from './dto/update-article.dto';
@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {

    }
    @Get()
    findAll(): IArticle[] {
        return this.articleService.findAllArticle();
    }
    @Get("/:id")
    findOne(@Param() params: FindOneParams): IArticle {
        return this.findOrFail(params.id)
    }
    @Post()
    create(@Body() createArticleDto: createArticleDto): IArticle {
        return this.articleService.createArticle(createArticleDto);
    }
    @Put("/:id")
    update(@Param() params: FindOneParams, @Body() updateArticleDto: UpdateArticleDto): IArticle {
        const article = this.findOrFail(params.id)
        return this.articleService.updateArticleByParam(article, updateArticleDto)
    }
    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param() params: FindOneParams): void {
        const article = this.findOrFail(params.id)
        this.articleService.deleteArticleByParam(article)
    }

    private findOrFail(id: string): IArticle {
        const article = this.articleService.findOneByParam(id)
        if (!article) {
            throw new NotFoundException()
        }
        return article
    }
}
