import { Request, Response } from "express";
import { encrypt } from "../security/encrypt";
import { decryptPassword } from "../security/decrypt";
import { userRepository } from "../repositories/userRepository";
import jwt from "jsonwebtoken";
import { BookRepository } from "../repositories/BookRepositorry";

export class UserController {
  async signup(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
      const userExists = await userRepository.findOneBy({ email });

      if (userExists) {
        return res.status(400).json({ message: "User already exists" });
      }

      const passwordHash = await encrypt(password);
      const newUser = userRepository.create({
        name,
        email,
        password: passwordHash,
      });
      await userRepository.save(newUser);

      const { password: _, ...user } = newUser;

      return res.status(201).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        "error message": "Internal Server Error",
      });
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const expirationTimeInSeconds = 7200; //2 horas
      const user = await userRepository.findOneBy({ email });

      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const verifyPassword = await decryptPassword(password, user.password);

      if (!verifyPassword) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? "", {
        expiresIn: expirationTimeInSeconds,
      });

      const { password: _, ...userLogin } = user;

      return res.status(200).json({
        user: userLogin,
        token: token,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        "error message": "Internal Server Error",
      });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const users = await userRepository.find();
      return res.status(200).json({ users });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        "error message": "Internal Server Error",
      });
    }
  }

  async createBook(req: Request, res: Response) {
    const { user_id } = req.params;
    const { title, quantity, image_url } = req.body;

    try {
      const user = await userRepository.findOneBy({ id: Number(user_id) });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const newBook = BookRepository.create({
        title,
        quantity,
        image_url,
      });

      await BookRepository.save(newBook);
      user.books_registered.push(newBook.id);
      await userRepository.save(user);
      return res.status(201).json(newBook);
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        "error message": "Internal Server Error",
      });
    }
  }
}
