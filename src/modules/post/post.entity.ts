import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { Category } from '../category/category.entity';
import { Tag } from '../tag/tag.entity';
import { Comment } from '../comment/comment.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('longtext', { nullable: true })
  body: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToOne(type => User, user => user.posts)
  user: User;

  @ManyToMany(type => User, user => user.voted)
  liked: User[];

  @ManyToOne(type => Category, category => category.posts)
  category: Category

  @ManyToMany(type => Tag, tag => tag.posts)
  @JoinTable()
  tags: Tag[];

  @OneToMany(type => Comment, comment => comment.post)
  comments: Comment[];
}