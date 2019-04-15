import {
  Entity, PrimaryGeneratedColumn, Column, OneToMany
} from 'typeorm';
import { Post } from '../post/post.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  alias: string;

  @OneToMany(type => Post, post => post.category)
  posts: Post[]
}