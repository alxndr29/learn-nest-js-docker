import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Article } from '../../article/entities/article.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => Article, (article) => article.id)
  article: Article;
  @Column({ type: 'uuid' })
  articleId: string;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn()
  readonly createdAt!: Date;

  @UpdateDateColumn()
  readonly updatedAt!: Date;
}
