import {
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity({name: "user"})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: 'text',
    unique: true,
    nullable: true
  })
  externalId: string;

  @Column({
    length: 30,
  })
  firstName: string;

  @Column({
    length: 30,
  })
  lastName: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({ nullable: true })
  pictureUrl?: string;

  @Column()
  isSocialLogin: boolean;

  @CreateDateColumn({ update: false })
  createdAt: Date;

  @UpdateDateColumn({ update: false })
  updatedAt: Date;
}
