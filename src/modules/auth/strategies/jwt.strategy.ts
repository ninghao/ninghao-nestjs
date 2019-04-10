import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt, VerifiedCallback } from "passport-jwt";
import { JwtPayload } from "../auth.interface";
import { UserService } from "src/modules/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'qHqPHVPasjfHDCrcX7Ao7x5O5W098RU3i6lloVgWZFY='
    })
  }

  async validate(payload: JwtPayload) {
    console.log('payload:', payload);
    const { name } = payload;
    const entity = await this.userService.findByName(name);

    if (!entity) {
      throw new UnauthorizedException('没找到用户。');
    }

    return entity;
  }
}