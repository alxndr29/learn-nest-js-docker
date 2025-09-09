import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ArticleTag } from '../../articletag/entities/articletag.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => ArticleTag, (articleTag) => articleTag.tag)
  articleTags: ArticleTag[];
}
