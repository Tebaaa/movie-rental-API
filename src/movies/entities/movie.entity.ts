import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MovieEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

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

  @Column('json', { nullable: true })
  tags: string[];
}
