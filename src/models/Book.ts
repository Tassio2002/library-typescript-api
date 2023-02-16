import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity('books')
export class Book {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "int" })
    quantity: number

    @Column({ type: "text" })
    title: string

    @Column({ type: "text", nullable: true })
    image_url: string

    @ManyToOne(() => User, user => user.books_registered)
    @JoinColumn({ name: 'user_id' })
    user: User
}