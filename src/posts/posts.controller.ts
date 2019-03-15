import { Controller, Get, Req, Query, Headers, Param } from '@nestjs/common';

@Controller('posts')
export class PostsController {
  @Get()
  index(@Headers('authorization') headers) {
    console.log(headers)

    return [
      {
        title: 'hello ~'
      }
    ];
  }

  @Get(':id')
  show(@Param() params) {
    return {
      title: `Post ${params.id}`
    }
  }
}
