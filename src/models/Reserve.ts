import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book";

@Entity('reserve')
export class Reserve {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        default: () => "now()",
        type: "timestamptz"
    })
    date_reserve: Date

    @DeleteDateColumn()
    date_devolution: Date

    @OneToOne(() => Book)
    @JoinColumn({ name: 'book_id' })
    book: Book
}