import { Repository } from 'typeorm';

import { RecordEntity } from '@Movies/entities';
import { InjectRepository } from '@nestjs/typeorm';

export class RecordsRepository extends Repository<RecordEntity> {
  constructor(
    @InjectRepository(RecordEntity)
    private repository: Repository<RecordEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
  findOneRentedMovie(movieId: string, userId: string): Promise<RecordEntity> {
    return this.repository.findOne({
      where: {
        movie_id: movieId,
        user_id: userId,
        rent: true,
      },
    });
  }
}
