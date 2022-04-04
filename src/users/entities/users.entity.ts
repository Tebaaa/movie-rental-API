import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
}
