import { ConflictException, Injectable } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Injectable()
export class RentalServices {
  constructor(private movieService: MoviesService) {}
  async buy(id: number) {
    let { stock, available } = await this.movieService.findById(id);
    if (stock && available) {
      stock--;
      const lastUnit = stock === 0;
      if (lastUnit) available = false;
      return this.movieService.update(id, { stock, available });
    }
    throw new ConflictException('No stock available');
  }

  async rent(id: number) {
    return this.buy(id);
  }

  async return(id: number) {
    let { stock, available } = await this.movieService.findById(id);
    if (!available) available = true;
    stock++;
    return this.movieService.update(id, { stock, available });
  }
}
