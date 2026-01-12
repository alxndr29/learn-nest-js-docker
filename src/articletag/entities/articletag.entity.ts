import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn} from 'typeorm';
import { Tag } from '../../tag/entities/tag.entity';
import { Article } from '../../article/entities/article.entity';

@Entity()
export class ArticleTag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Tag, (tag) => tag.articleTags, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tagId' })
  tag: Tag;

  @Column({ type: 'uuid' })
  tagId: string;

  @ManyToOne(() => Article, (article) => article.articleTags, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'articleId' })
  article: Article;

  @Column({ type: 'uuid' })
  articleId: string;
}
