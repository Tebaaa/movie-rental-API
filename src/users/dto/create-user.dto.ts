import { IsBoolean, IsEmail, IsString } from 'class-validator';
export class CreateUserDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsBoolean()
  readonly admin: boolean;

  @IsBoolean()
  readonly client: boolean;
}
