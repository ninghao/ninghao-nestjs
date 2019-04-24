import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/core/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Post('login')
  async login(
    @Body() data: LoginDto
  ) {
    return await this.authService.login(data);
  }

  @Get('test')
  @UseGuards(AuthGuard())
  async authTest(
    @User() user
  ) {
    console.log('user:', user);

    return {
      message: 'ok'
    }
  }
}
