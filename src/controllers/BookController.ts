import { Request, Response } from "express";
import { BookRepository } from "../repositories/BookRepositorry";

export class BookController {
  async list(req: Request, res: Response) {
    try {
      const books = await BookRepository.find({
        relations: {
            user: true
        }
      });

      return res.status(200).json({books});
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        "error message": "Internal Server Error",
      });
    }
  }
}
