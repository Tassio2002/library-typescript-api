import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "text" })
  email: string;

  @Column({ type: "text" })
  password: string;

  @Column("int", { array: true, nullable: true })
  @OneToMany(() => Book, book => book.user)
  books_registered: Book[];

  @Column("int", { array: true, nullable: true })
  @OneToMany(() => Book, book => book.user)
  books_reserved: Book[];
}
