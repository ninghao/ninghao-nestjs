import { Controller, Post, UseGuards, UseInterceptors, ClassSerializerInterceptor, Param, ParseIntPipe, Body, Put, Delete, Get } from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from '@nestjs/passport';
import { CommentDto } from './comment.dto';
import { User } from 'src/core/decorators/user.decorator';
import { User as UserEntity } from '../user/user.entity';

@Controller()
export class CommentController {
  constructor(
    private readonly commentService: CommentService
  ) { }

  @Post('posts/:id/comments')
  @UseGuards(AuthGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  async storePostComment(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CommentDto,
    @User() user: UserEntity
  ) {
    return await this.commentService.storePostComment(id, user, data);
  }

  @Put('comments/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CommentDto
  ) {
    return this.commentService.update(id, data);
  }

  @Delete('comments/:id')
  async destroy(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.commentService.destroy(id);
  }

  @Get('posts/:id/comments')
  async showPostComments(
    @Param('id', ParseIntPipe) id: number
  ) {
    return await this.commentService.showPostComments(id);
  }

  @Get('users/:id/comments')
  async showUserComments(
    @Param('id', ParseIntPipe) id: number
  ) {
    return await this.commentService.showUserComments(id);
  }
}
