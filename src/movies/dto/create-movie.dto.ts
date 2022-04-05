import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateMovieDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsUrl()
  readonly poster: string;

  @IsPositive()
  readonly stock: number;

  @IsUrl()
  readonly trailer_url: string;

  @IsNumber()
  readonly sale_price: number;

  @IsNumber()
  readonly rent_price: number;

  @IsNumber()
  readonly likes: number;

  @IsBoolean()
  readonly available: boolean;

  @IsString({ each: true })
  @IsOptional()
  readonly tags?: string[];
}
