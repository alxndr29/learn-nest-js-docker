import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ArticleStatus } from '../interface/article.interface';
import { Category } from '../../category/entities/category.entity';
import { User } from '../../auth/entities/user.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  title: string;
  @Column({
    type: 'text',
  })
  content: string;
  @Column({
    type: 'enum',
    enum: ArticleStatus,
    default: ArticleStatus.PENDING,
  })
  status: string;

  @Column({
    type: 'text',
  })
  image:string

  @ManyToOne(() => Category, (category) => category.id)
  category: Category;
  @Column({
    type: 'uuid',
  })
  categoryId: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
  @Column({
    type: 'uuid',
  })
  userId: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;
}
