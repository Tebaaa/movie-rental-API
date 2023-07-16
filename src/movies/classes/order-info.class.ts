import { User } from '@Users/entities';

import { MovieEntity } from '../entities/';
import { IOrderInfo } from '../interfaces/';

export class OrderInfo implements IOrderInfo {
  quantity: number;
  email: string;
  action: 'bought' | 'rented';
  movies_info: string[];
  total: number;
  name: string;

  constructor(movies: MovieEntity[], user: User, action: 'bought' | 'rented') {
    this.action = action;
    this.name = user.name;
    this.email = user.email;
    this.quantity = movies.length;
    if (action === 'bought') {
      this.total = movies.reduce((amount, movie) => {
        amount += movie.sale_price;
        return amount;
      }, 0);
      this.movies_info = movies.map((movie) => {
        const movie_info = {
          title: movie.name,
          description: movie.description,
          price: movie.sale_price,
        };
        return JSON.stringify(movie_info);
      });
    } else {
      this.total = movies.reduce((amount, movie) => {
        amount += movie.rent_price;
        return amount;
      }, 0);
      this.movies_info = movies.map((movie) => {
        const movie_info = {
          title: movie.name,
          description: movie.description,
          price: movie.rent_price,
        };
        return JSON.stringify(movie_info);
      });
    }
  }
}
