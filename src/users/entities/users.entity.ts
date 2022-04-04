import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  username: string;

  @Exclude()
  @Column({ length: 30 })
  password: string;

  @Column()
  admin: boolean;

  @Column()
  client: boolean;
}
