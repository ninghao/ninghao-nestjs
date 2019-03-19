import { Controller, Get, Req, Query, Headers, Param, Post, Body } from '@nestjs/common';
import { CreatePostDto } from './post.dto';
import { DemoService } from './providers/demo/demo.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly demoService: DemoService) { }

  @Get()
  index() {
    return this.demoService.findAll();
  }

  @Get(':id')
  show(@Param() params) {
    return {
      title: `Post ${params.id}`
    }
  }

  @Post()
  store(@Body() post: CreatePostDto) {
    this.demoService.create(post);
  }
}
