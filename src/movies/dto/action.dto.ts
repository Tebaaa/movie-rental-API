import { IsString } from 'class-validator';

type ActionType = 'buy' | 'rent' | 'return';

export class ActionDto {
  @IsString()
  readonly action: ActionType;
}
