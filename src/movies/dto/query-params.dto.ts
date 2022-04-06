import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

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
  @Transform(({ value }) => {
    if (value === 'true') {
      return true;
    }
    if (value === 'false') {
      return false;
    }
    return 'bad request';
  })
  @IsBoolean()
  available: boolean;
}
