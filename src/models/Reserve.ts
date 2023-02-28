import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book";

@Entity('reserve')
export class Reserve {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "timestamptz"})
    date_reserve: Date

    @Column({type: "timestamptz", nullable: true})
    date_devolution: Date

    @OneToOne(() => Book)
    @JoinColumn({ name: 'book_id' })
    book: Book
}