import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn, Unique, UpdateDateColumn
} from 'typeorm';

@Entity()
@Unique(["email"])
export class UserEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @CreateDateColumn()
  created_on?: Date;

  @UpdateDateColumn()
  updated_on?: Date;

  @Column({ default: true })
  activated?: boolean;
}
