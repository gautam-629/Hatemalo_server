import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IPhoto } from "../../../../domain/entities";

@Entity("photos")
export class Photo implements IPhoto{
   
    @PrimaryGeneratedColumn()
    id: string;

    @Column({type:'varchar'})
     photo: string;

    @UpdateDateColumn()
    updateAt: string;

    @CreateDateColumn()
    createdAt: string;
}