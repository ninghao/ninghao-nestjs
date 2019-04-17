import { Controller, Post, Body, Put, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagDto } from './tag.dto';

@Controller('tags')
export class TagController {
  constructor(
    private readonly tagService: TagService
  ) { }

  @Post()
  async store(@Body() data: TagDto) {
    return await this.tagService.store(data);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: TagDto) {
    return await this.tagService.update(id, data);
  }

  @Delete(':id')
  async destroy(@Param('id', ParseIntPipe) id: number) {
    return await this.tagService.destroy(id);
  }
}
