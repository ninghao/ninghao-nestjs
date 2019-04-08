import { Controller, Post, Body } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService
  ) { }

  @Post()
  async store(@Body() data) {
    return await this.postService.store(data);
  }
}
