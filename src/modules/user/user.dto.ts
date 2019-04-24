import { Role } from "../role/role.entity";

export class UserDto {
  readonly name: string;
  readonly password: string;
  readonly roles: Role[];
}

export class UpdatePasswordDto {
  readonly password: string;
  readonly newPassword: string;
}