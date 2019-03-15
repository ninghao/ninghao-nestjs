import { Controller, Get, Req, Query } from '@nestjs/common';

@Controller('posts')
export class PostsController {
  @Get()
  index(@Query() query) {
    console.log(query)

    return [
      {
        title: 'hello ~'
      }
    ];
  }
}
