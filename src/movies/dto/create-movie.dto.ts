import { IsBoolean, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly poster: string;

  @IsNumber()
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
  readonly tags: string[];
}
