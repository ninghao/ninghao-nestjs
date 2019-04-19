import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { Post } from '../post/post.entity';
import { Comment } from '../comment/comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { unique: true })
  name: string;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @OneToMany(type => Post, post => post.user)
  posts: Post[]

  @ManyToMany(type => Post, post => post.liked)
  @JoinTable()
  voted: Post[]

  @OneToMany(type => Comment, comment => comment.user)
  comments: Comment[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  async comparePassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}