import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IProfile } from "../../../../domain/entities";

@Entity("photos")
export class Photo implements IProfile{
   
    @PrimaryGeneratedColumn()
    id: string;

    @Column({type:'varchar'})
     profile: string;

    @UpdateDateColumn()
    updateAt: string;

    @CreateDateColumn()
    createdAt: string;
}