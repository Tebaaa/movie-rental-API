import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { RecordEntity, TagEntity } from './';

@Entity('movie')
export class MovieEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  poster: string;

  @Column()
  stock: number;

  @Column()
  trailer_url: string;

  @Column()
  sale_price: number;

  @Column()
  rent_price: number;

  @Column()
  likes: number;

  @Column()
  available: boolean;

  @JoinTable()
  @ManyToMany((type) => TagEntity, (tag) => tag.movies)
  tags: TagEntity[];

  @OneToMany((type) => RecordEntity, (record) => record.movie)
  record: RecordEntity[];
}
