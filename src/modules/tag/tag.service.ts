import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { Repository } from 'typeorm';
import { TagDto } from './tag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>
  ) { }

  async store(data: TagDto) {
    return await this.tagRepository.save(data);
  }

  async update(id: number, data: TagDto) {
    return await this.tagRepository.update(id, data);
  }

  async destroy(id: number) {
    return await this.tagRepository.delete(id);
  }
}
