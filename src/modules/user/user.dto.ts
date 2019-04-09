export class UserDto {
  readonly name: string;
  readonly password: string;
}

export class UpdatePasswordDto {
  readonly password: string;
  readonly newPassword: string;
}