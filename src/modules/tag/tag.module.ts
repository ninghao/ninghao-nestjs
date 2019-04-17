import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './tag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tag])
  ],
  controllers: [TagController],
  providers: [TagService]
})
export class TagModule { }
