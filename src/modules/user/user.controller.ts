import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Post()
  async store(@Body() data: UserDto) {
    return await this.userService.store(data);
  }

  @Get(':id')
  async show(@Param('id') id: string) {
    return await this.userService.show(id);
  }
}
