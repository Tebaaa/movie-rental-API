import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '@Users/entities';

import { MovieEntity } from '../entities';

@Entity('record')
export class RecordEntity {
  @PrimaryGeneratedColumn('uuid')
  record_id: string;

  @Column('uuid')
  user_id: string;

  @Column('uuid')
  movie_id: string;

  //TODO: Use enum for action
  @Column({ nullable: true })
  rent: boolean;

  @Column({ nullable: true })
  buy: boolean;

  @Column({ nullable: true })
  return: boolean;

  @ManyToOne((type) => User, (user) => user.records)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne((type) => MovieEntity, (movie) => movie.record)
  @JoinColumn({ name: 'movie_id' })
  movie: MovieEntity;
}
