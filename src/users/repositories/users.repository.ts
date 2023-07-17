import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../entities';

export class UsersRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async findOneUserById(id: string): Promise<User> {
    return this.repository.findOne({ where: { id } });
  }

  async findOneUserByEmail(email: string): Promise<User> {
    return this.repository.findOne({ where: { email } });
  }
}
