import { AppDataSource } from "../data-source";
import { Book } from "../models/Book";


export const BookRepository = AppDataSource.getRepository(Book)