import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { Iuser } from '../../../../domain/entities';
import { UserRole } from '../../../../enum';
import { Exclude } from 'class-transformer';

@Entity()
export class User implements Iuser {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', length: 255 ,unique:true})
  email: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255})
  password: string;

  @Column({ type: 'varchar', length: 255, default: 'user' })
  role: UserRole;
 
  @UpdateDateColumn()
  createdAt: Date;
 
  @CreateDateColumn()
  updatedAt: Date;
}
