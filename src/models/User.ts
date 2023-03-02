import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  name: string;
//alterar email para unico
  @Column({ type: "text" })
  email: string;

  @Column({ type: "text" })
  password: string;

  @Column("int", { array: true, nullable: true, default: [] })
  books_registered: number[];

  @Column("int", { array: true, nullable: true, default: []})
  books_reserved: number[];
}
