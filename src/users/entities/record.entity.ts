import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { MovieEntity } from '@Movies/entities';

import { User } from './';

@Entity('record')
export class RecordEntity {
  @PrimaryGeneratedColumn()
  record_id: number;

  @Column()
  user_id: string;

  @Column()
  movie_id: number;

  //TODO: Use enum for action
  @Column({ nullable: true })
  rent: boolean;

  @Column({ nullable: true })
  buy: boolean;

  @Column({ nullable: true })
  return: boolean;

  @ManyToOne((type) => User, (user) => user.record)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne((type) => MovieEntity, (movie) => movie.record)
  @JoinColumn({ name: 'movie_id' })
  movie: MovieEntity;
}
