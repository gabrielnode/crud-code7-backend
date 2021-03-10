import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn, Unique, UpdateDateColumn
  } from 'typeorm';
  
  @Entity()
  @Unique(["id"])
  export class DebtEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    user_id: number;

    @Column({ nullable: true })
    user_name: string;

    @Column({ nullable: true })
    motivation_debt: string;
  
    @Column({ nullable: true })
    value: string;
  
    @CreateDateColumn()
    date_debt: Date;
  
    @CreateDateColumn()
    created_on?: Date;
  
    @UpdateDateColumn()
    updated_on?: Date;

  }