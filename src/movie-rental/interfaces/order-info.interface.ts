import { MovieEntity } from '../../movies/entities/movie.entity';
import { User } from '../../users/entities/users.entity';

export class IOrderInfo {
  total: number;
  movies: MovieEntity[];
  user: User;
  action: 'bought' | 'rented';
  movies_info: string[];
}
