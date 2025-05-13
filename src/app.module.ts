import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { ArticleService } from './article/article.service';

@Module({
  imports: [ArticleModule],
  controllers: [AppController],
  providers: [AppService, ArticleService],
})
export class AppModule {}
