import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { MovieEntity } from './';

@Entity('tag')
export class TagEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20 })
  name: string;

  @JoinTable()
  @ManyToMany((type) => MovieEntity, (movie) => movie.tags)
  movies: MovieEntity[];
}
