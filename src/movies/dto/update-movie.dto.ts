import { PartialType } from '@nestjs/mapped-types';

import { CreateMovieDto } from './';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
