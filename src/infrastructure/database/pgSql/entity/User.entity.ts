import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Iuser } from '../../../../domain/entities';
import { UserType } from '../../../../enum';
import { Photo } from './photo.entity';

@Entity('users')
export class User implements Iuser {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({type:'varchar',length:255})
  name:string;

  @Column({type:'varchar',length:255})
  phoneNumber: string;

  @Column({type:'varchar',length:255})
  userType: UserType;

  @Column({ type: 'varchar', length: 255 ,unique:true})
  email: string;

  @Column({ type: 'varchar', length: 255})
  password: string;

  @UpdateDateColumn()
  createdAt: Date;
 
 @OneToMany(()=>Photo,(photo)=>photo.user)
  photo:Photo[]

  @CreateDateColumn()
  updatedAt: Date;
}
