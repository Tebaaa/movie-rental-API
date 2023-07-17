import { IsArray, IsString } from 'class-validator';

//TODO: Make this an enum
type ActionType = 'buy' | 'rent' | 'return';
export class RentalActionDto {
  @IsString()
  readonly action: ActionType;

  @IsArray()
  @IsString({ each: true })
  readonly moviesId: string[];
}
