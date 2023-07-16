import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToMany,
} from 'typeorm';
import { RecordEntity } from './record.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 30 })
  name: string;

  @Column({ length: 30, nullable: true })
  lastname: string;

  @Index()
  @Column({ length: 50 })
  email: string;

  @Exclude()
  @Column({ length: 30 })
  password: string;

  @Column()
  admin: boolean;

  @Column()
  client: boolean;

  @OneToMany((type) => RecordEntity, (record) => record.user)
  record: RecordEntity[];
}
