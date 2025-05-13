import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ArticleService } from './article.service';
import { createArticleDto } from './dto/create-article.dto';
import { IArticle } from './interface/article.interface';

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {

    }
    @Get()
    findAll(): IArticle[] {
        return this.articleService.findAllArticle();
    }
    @Get("/:id")
    findOne(@Param() params: any): string {
        return `Get One Article With ID ${params.id}`
    }
    @Post()
    create(@Body() createArticleDto: createArticleDto): IArticle {
       return this.articleService.createArticle(createArticleDto);
    }
    @Put("/:id")
    update(@Param() params: any): string {
        return `Update Article With ID ${params.id}`
    }
    @Delete("/:id")
    delete(@Param() params: any): string {
        return `Delete Article With ID ${params.id}`
    }
}
