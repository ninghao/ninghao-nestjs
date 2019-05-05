import { Injectable } from '@nestjs/common';
import { FileDto } from './file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './file.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>
  ) { }

  async store(data: FileDto) {
    return await this.fileRepository.save(data);
  }
}
