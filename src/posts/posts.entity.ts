import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/user.entity";

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;
    
    @Column() // Esto indica que authorId no puede ser null
    authorId: number;

    @ManyToOne(()=> User, user => user.posts)
    author: User;
}