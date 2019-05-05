import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards, UseInterceptors, ClassSerializerInterceptor, ParseIntPipe, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './post.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/core/decorators/user.decorator';
import { User as UserEntity } from '../user/user.entity';
import { ListOptions } from 'src/core/decorators/list-options.decorator';
import { ListOptionsInterface } from 'src/core/interfaces/list-options.interface';
import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import { AccessGuard } from 'src/core/guards/access.guard';
import { Permissions } from 'src/core/decorators/permissions.decorator';
import { Resource } from 'src/core/enums/resource.enum';
import { Possession } from 'src/core/enums/possession.enum';
import { UserRole } from 'src/core/enums/user-role.enum';

@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService
  ) { }

  @Post()
  @UseGuards(AuthGuard())
  async store(
    @Body() data: PostDto,
    @User() user: UserEntity
  ) {
    return await this.postService.store(data, user);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor, TransformInterceptor)
  async index(
    @ListOptions({ limit: 10, sort: 'updated', order: 'DESC' })
    options: ListOptionsInterface
  ) {
    return await this.postService.index(options);
  }

  @Get(':id')
  async show(
    @Param('id') id: string
  ) {
    return await this.postService.show(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard(), AccessGuard)
  @Permissions({ resource: Resource.POST, possession: Possession.OWN, role: UserRole.VIP })
  async update(
    @Param('id') id: string,
    @Body() data: Partial<PostDto>
  ) {
    return await this.postService.update(id, data);
  }

  @Delete(':id')
  async destroy(
    @Param('id') id: string
  ) {
    return await this.postService.destroy(id);
  }

  @Post(':id/vote')
  @UseGuards(AuthGuard())
  async vote(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserEntity,
  ) {
    return await this.postService.vote(id, user);
  }

  @Delete(':id/vote')
  @UseGuards(AuthGuard())
  async unVote(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserEntity,
  ) {
    return await this.postService.unVote(id, user);
  }

  @Get(':id/liked')
  @UseInterceptors(ClassSerializerInterceptor)
  async liked(
    @Param('id', ParseIntPipe) id: number
  ) {
    return await this.postService.liked(id);
  }
}
