import { IsNumber, IsString } from 'class-validator';

type ActionType = 'buy' | 'rent' | 'return';
export class RentalActionDto {
  @IsString()
  readonly action: ActionType;

  @IsNumber({}, { each: true })
  readonly movies: number | number[];
}
