import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService
  ) { }

  async login(data: LoginDto) {
    const { name, password } = data;
    const entity = await this.userService.findByName(name);

    if (!entity) {
      throw new UnauthorizedException('用户名不存在');
    }

    if (!(await entity.comparePassword(password))) {
      throw new UnauthorizedException('密码不匹配。');
    }

    return entity;
  }
}
