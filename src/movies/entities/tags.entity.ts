import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MovieEntity } from './movie.entity';

@Entity('tag')
export class TagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  name: string;

  @JoinTable()
  @ManyToMany((type) => MovieEntity, (movie) => movie.tags)
  movies: MovieEntity[];
}
