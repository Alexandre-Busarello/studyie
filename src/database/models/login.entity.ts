import {
  Column,
  Entity,
  PrimaryColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn
} from 'typeorm';
import { UserEntity } from 'database/models/user.entity';

@Entity({name: "login"})
export class LoginEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    length: 30,
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @CreateDateColumn({ update: false })
  createdAt: Date;

  @UpdateDateColumn({ update: false })
  updatedAt: Date;
}
