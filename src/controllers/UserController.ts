import { Request, Response } from "express";
import { encrypt } from "../security/encrypt";
import { userRepository } from "../repositories/userRepository";
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
}
