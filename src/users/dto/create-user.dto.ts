import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly lastname?: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  //TODO: Create & Use Role Enum
  @IsBoolean()
  readonly admin: boolean;

  @IsBoolean()
  readonly client: boolean;
}
