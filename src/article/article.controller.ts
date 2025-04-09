import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('article')
export class ArticleController {
    @Get()
    findAll(): string {
        return "Find All Article"
    }
    @Get("/:id")
    findOne(@Param() params: any): string {
        return `Get One Article With ID ${params.id}`
    }
    @Post()
    create(): string {
        return "Add Article"
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
