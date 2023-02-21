import { Request, Response } from "express";
import { encrypt } from "../security/encrypt";
import { userRepository } from "../repositories/userRepository";
import { BookRepository } from "../repositories/BookRepositorry";
export class UserController {
  async signup(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const passwordHash = await encrypt(password);

    try {
      const newUser = userRepository.create({
        name,
        email,
        password: passwordHash,
      });
      await userRepository.save(newUser);
      return res.status(201).json(newUser);
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        "error message": "Internal Server Error",
      });
    }
  }

  async createBook (req: Request, res: Response) {
    const {title, quantity, image_url} = req.body
    const {user_id} = req.params

    try {
        const user = await userRepository.findOneBy({id: Number(user_id)})

        if (!user) {
          return res.status(404).json({message: "User not found"})
        }

        const newBook = BookRepository.create({
          title,
          quantity,
          image_url,
          user
        })

        await BookRepository.save(newBook)

        return res.status(201).json(newBook)

    } catch (error) {
        
    }
}
}
