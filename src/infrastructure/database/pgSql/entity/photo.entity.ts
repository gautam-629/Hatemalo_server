import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IPhoto } from "../../../../domain/entities";
import { User } from "./User.entity";

@Entity("photos")
export class Photo implements IPhoto{
   
    @PrimaryGeneratedColumn()
    id: string;

    @Column({type:'varchar'})
     photo: string;

    @UpdateDateColumn()
    updateAt: string;

    @ManyToOne(()=>User,(user)=>user.photo)
    user:User

    @CreateDateColumn()
    createdAt: string;
}