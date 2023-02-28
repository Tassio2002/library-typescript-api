import { Request, Response } from "express";
import { BookRepository } from "../repositories/BookRepositorry";
import { ReserveRepository } from "../repositories/ReserveRepository";
import { userRepository } from "../repositories/userRepository";

export class BookController {
  async list(req: Request, res: Response) {
    try {
      const books = await BookRepository.find({
        relations: {
          user: true,
        },
      });

      return res.status(200).json({ books });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        "error message": "Internal Server Error",
      });
    }
  }

  async createReserve(req: Request, res: Response) {
    const { user_logged, book_id } = req.params;

    try {
      const book = await BookRepository.findOneBy({ id: Number(book_id) });
      const userLogged = await userRepository.findOneBy({ id: Number(user_logged) });
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }

      const newReserve = ReserveRepository.create({
        book,
      });

      book.quantity -= 1;
      await BookRepository.save(book)

      await ReserveRepository.save(newReserve);
      userLogged!.books_reserved = [book];

      return res.status(201).json(newReserve);
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        "error message": "Internal Server Error",
      });
    }
  }
}
