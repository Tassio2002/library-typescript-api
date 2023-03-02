import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
}