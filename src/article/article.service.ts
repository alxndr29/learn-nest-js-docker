import { Injectable } from '@nestjs/common';
import { IArticle } from './interface/article.interface';
import { createArticleDto } from './dto/create-article.dto';
import { randomUUID } from 'crypto';
import { UpdateArticleDto } from './dto/update-article.dto';


@Injectable()
export class ArticleService {
    //resourse
    private article: IArticle[] = []

    createArticle(createArticleDto: createArticleDto) {
        const article: IArticle = {
            id: randomUUID(),
            ...createArticleDto
        }
        this.article.push(article)
        return article
    }

    findAllArticle(): IArticle[] {
        return this.article
    }

    findOneByParam(id: string): IArticle | undefined {
        return this.article.find(item => item.id === id)
    }

    updateArticleByParam(article: IArticle, updateArticleDto: UpdateArticleDto): IArticle {
        Object.assign(article, updateArticleDto)
        return article
    }

    deleteArticleByParam(articleData: IArticle): void {
        this.article = this.article.filter((filterData) => filterData.id !== articleData.id)
    }
}
