import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { TagEntity } from '../entities';

export class TagsRepository extends Repository<TagEntity> {
  constructor(
    @InjectRepository(TagEntity)
    private readonly repository: Repository<TagEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  findOneTagByName(name: string): Promise<TagEntity> {
    return this.repository.findOne({ where: { name } });
  }
}
