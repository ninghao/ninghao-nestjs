import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './post.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService
  ) { }

  @Post()
  @UseGuards(AuthGuard())
  async store(@Body() data: PostDto) {
    return await this.postService.store(data);
  }

  @Get()
  async index() {
    return await this.postService.index();
  }

  @Get(':id')
  async show(@Param('id') id: string) {
    return await this.postService.show(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<PostDto>) {
    return await this.postService.update(id, data);
  }

  @Delete(':id')
  async destroy(@Param('id') id: string) {
    return await this.postService.destroy(id);
  }
}
