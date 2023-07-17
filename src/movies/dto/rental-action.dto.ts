import { IsArray, IsNumber, IsString } from 'class-validator';

type ActionType = 'buy' | 'rent' | 'return';
export class RentalActionDto {
  @IsString()
  readonly action: ActionType;

  @IsArray()
  @IsNumber({}, { each: true })
  readonly moviesId: number[];
}
