import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TagEntity } from './tags.entity';

@Entity('movie')
export class MovieEntity {
  @PrimaryGeneratedColumn()
  id: number;

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
}
