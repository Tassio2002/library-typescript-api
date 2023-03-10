import { Request, Response } from "express";
import { ILike } from "typeorm";
import { BookRepository } from "../repositories/BookRepositorry";
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
          .status(400)
          .json({ message: "User not found, please signup" });
      }

      if (!book) {
        return res.status(400).json({ message: "Book not found" });
      }

      const booksRegisteredIds: number[] = [];

      if (booksRegistered !== null) {
        booksRegistered.forEach((book) => {
          booksRegisteredIds.push(book);
        });
      }

      const verifybooksRegistered = booksRegisteredIds.includes(Number(book_id))

      if (verifybooksRegistered) {
        return res.status(400).json({
          message: "The book belongs to you, therefore it cannot be reserved.",
        });
      }

      const booksReservedd: boolean = booksReserved.includes(Number(book_id));

      if (booksReservedd) {
        return res.status(400).json({
          message:
            "The book has already been booked by you and cannot be booked again.",
        });
      }

      if (book.quantity === 0) {
        return res.status(400).json({
          message: "The chosen book is currently out of units available.",
        });
      }

      book.quantity -= 1;
      booksReserved.push(book.id);

      await Promise.all([
        BookRepository.save(book),
        userRepository.save(userLogged),
      ]);

      return res.status(201).json(userLogged);
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        "error message": "Internal Server Error",
        error,
      });
    }
  }

  async bookDevolution(req: Request, res: Response) {
    const { user_id, book_id } = req.params;
    const userId = Number(user_id);
    const bookId = Number(book_id);
    try {
      const user = await userRepository.findOneBy({ id: userId });
      const book = await BookRepository.findOneBy({ id: bookId });

      if (!user) {
        return res.status(400).json({
          message: "User not found, please signup",
        });
      }

      if (!book) {
        return res.status(400).json({ message: "Book not found" });
      }

      const { books_reserved } = user;

      const isBookReserved = books_reserved.includes(bookId);

      if (!isBookReserved) {
        return res.status(400).json({
          message: "This book is not in your reserved books.",
        });
      }
      const bookToRemove = books_reserved.indexOf(bookId);
      books_reserved.splice(bookToRemove, 1);

      book.quantity += 1;

      await Promise.all([userRepository.save(user), BookRepository.save(book)]);

      return res.status(200).json({
        message: `The book with id: ${bookId} was successfully returned.`,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        "error message": "Internal Server Error",
        error,
      });
    }
  }

  async searchBookByTitle(req: Request, res: Response) {
    const { title_search } = req.body;

    try {
      const booksResult = await BookRepository.find({
        where: {
          title: ILike(`%${title_search}%`),
        },
      });

      if (!booksResult.length) {
        return res.status(400).json({
          message: `No book was found with the title: ${title_search}.`,
        });
      }

      return res.status(200).json(booksResult);
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        "error message": "Internal Server Error",
        error,
      });
    }
  }
}
