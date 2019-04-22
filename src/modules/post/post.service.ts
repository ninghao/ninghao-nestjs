import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { PostDto } from './post.dto';
import { User } from '../user/user.entity';
import { ListOptionsInterface } from 'src/core/interfaces/list-options.interface';
import { Tag } from '../tag/tag.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>
  ) { }

  async beforeTag(tags: Partial<Tag>[]) {
    const _tags = tags.map(async item => {
      const { id, name } = item;

      if (id) {
        const _tag = await this.tagRepository.findOne(id)

        if (_tag) {
          return _tag;
        }

        return;
      }

      if (name) {
        const _tag = await this.tagRepository.findOne({ name });

        if (_tag) {
          return _tag;
        }

        return await this.tagRepository.save(item);
      }
    });

    return Promise.all(_tags);
  }

  async store(data: PostDto, user: User) {
    const { tags } = data;

    if (tags) {
      data.tags = await this.beforeTag(tags);
    }

    const entity = await this.postRepository.create(data);
    await this.postRepository.save({
      ...entity,
      user
    });
    return entity;
  }

  async index(options: ListOptionsInterface) {
    const { categories, tags, page, limit, sort, order } = options;
    const queryBuilder = await this.postRepository
      .createQueryBuilder('post');

    queryBuilder.leftJoinAndSelect('post.user', 'user');
    queryBuilder.leftJoinAndSelect('post.category', 'category');
    queryBuilder.leftJoinAndSelect('post.tags', 'tag');

    if (categories) {
      queryBuilder.where('category.alias IN (:...categories)', { categories });
    }

    if (tags) {
      queryBuilder.andWhere('tag.name IN (:...tags)', { tags });
    }

    queryBuilder
      .take(limit)
      .skip(limit * (page - 1));

    queryBuilder
      .orderBy({
        [`post.${sort}`]: order
      });

    const entities = queryBuilder.getManyAndCount();
    return entities;
  }

  async show(id: string) {
    const entity = await this.postRepository.findOne(id);
    return entity;
  }

  async update(id: string, data: Partial<PostDto>) {
    const { tags } = data;
    delete data.tags;

    await this.postRepository.update(id, data);

    const entity = await this.postRepository
      .findOne(id, { relations: ['category', 'tags'] });

    if (tags) {
      entity.tags = await this.beforeTag(tags);
    }

    return await this.postRepository.save(entity);
  }

  async destroy(id: string) {
    const result = await this.postRepository.delete(id);
    return result;
  }

  async vote(id: number, user: User) {
    await this.postRepository
      .createQueryBuilder()
      .relation(User, 'voted')
      .of(user)
      .add(id);
  }

  async unVote(id: number, user: User) {
    await this.postRepository
      .createQueryBuilder()
      .relation(User, 'voted')
      .of(user)
      .remove({ id });
  }

  async liked(id: number) {
    return await this.postRepository
      .createQueryBuilder()
      .relation(Post, 'liked')
      .of(id)
      .loadMany();
  }
}
