import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tag } from '../../tag/entities/tag.entity';
import { Article } from '../../article/entities/article.entity';

@Entity()
export class ArticleTag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Tag, (tag) => tag.id)
  tag: Tag;
  @Column({ type: 'uuid' })
  tagId: string;

  @ManyToOne(() => Article, (article) => article.id)
  article: Article;
  @Column({ type: 'uuid' })
  articleId: string;
}
