import { IsOptional, IsString } from 'class-validator';

type SortOptions = 'name' | 'likes';

export class QueryParamsDto {
  @IsOptional()
  @IsString()
  sortBy: SortOptions;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString({ each: true })
  tag: string | string[];

  @IsOptional()
  @IsString()
  available: string;
}
