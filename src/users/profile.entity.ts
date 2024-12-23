import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user profile')
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    FirstName: string;

    @Column()
    LastName: string;

    @Column({nullable: true})
    age: number
}