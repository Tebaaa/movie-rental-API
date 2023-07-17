import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { MovieEntity } from '../entities';

export class MoviesRepository extends Repository<MovieEntity> {
  constructor(
    @InjectRepository(MovieEntity)
    private repository: Repository<MovieEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
  findOneMovieById(id: string): Promise<MovieEntity> {
    return this.repository.findOne({ where: { id }, relations: ['tags'] });
  }

  findOneMovieByNameAndDescription(
    name: string,
    description: string,
  ): Promise<MovieEntity> {
    return this.repository.findOne({ where: { name, description } });
  }
}
