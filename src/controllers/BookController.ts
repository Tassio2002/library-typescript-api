import { Request, Response } from "express";
import { BookRepository } from "../repositories/BookRepositorry";
import { ReserveRepository } from "../repositories/ReserveRepository";
import { userRepository } from "../repositories/userRepository";

export class BookController {
  async list(req: Request, res: Response) {
    try {
      const books = await BookRepository.find();

      return res.status(200).json({ books });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        "error message": "Internal Server Error",
      });
    }
  }

  //Verificar quais ifs podem virar ternário
  //Transformar objetos em variáveis
  //apos finalizar fazer commits menores
  async createReserve(req: Request, res: Response) {
    const { user_logged, book_id } = req.params;

    try {
      const findUser = await userRepository.find({
        where: {
          id: Number(user_logged),
        },
      });
      const userLogged = findUser[0];
      const book = await BookRepository.findOneBy({ id: Number(book_id) });
      const booksRegistered = userLogged.books_registered;
      const booksReserved = userLogged.books_reserved;

      if (!userLogged) {
        return res
          .status(404)
          .json({ message: "User not found, please signup" });
      }

      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }

      //-----------Tentar transformar em função(verifica se o livro escolhido pertence ao usuário logado)------------//
      const booksRegisteredIds: number[] = [];

      if (booksRegistered !== null) {
        booksRegistered.forEach((book) => {
          booksRegisteredIds.push(book);
        });
      }

      let bookBelongsLoggedUser: boolean = false;
      booksRegisteredIds.forEach((id) => {
        if (id === Number(book_id)) {
          bookBelongsLoggedUser = true;
        }
      });

      if (bookBelongsLoggedUser !== false) {
        return res.status(400).json({
          message: "The book belongs to you, therefore it cannot be reserved.",
        });
      }
      //----------------------------------------------//
      const booksReservedIds: number[] = [];
      if (booksReservedIds !== null) {
        booksReserved.forEach((book) => {
          booksReservedIds.push(book);
        });
      }

      let isBookReservedLoggedUser: boolean = false;
      booksReservedIds.forEach((id) => {
        if (id === Number(book.id)) {
          isBookReservedLoggedUser = true;
        }
      });

      if (isBookReservedLoggedUser !== false) {
        return res.status(400).json({
          message:
            "The book has already been booked by you and cannot be booked again.",
        });
      }
      //----------------------------------------------//
      if (book.quantity === 0) {
        return res.status(400).json({
          message: "The chosen book is currently out of units available.",
        });
      }

      book.quantity -= 1;
      BookRepository.save(book);

      booksReserved.push(book.id);
      userRepository.save(userLogged);
      return res.status(201).json(userLogged);
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        "error message": "Internal Server Error",
        error,
      });
    }
  }
}
