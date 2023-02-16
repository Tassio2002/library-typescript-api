import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";

export class UserController {
  async signup(req: Request, res: Response) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).send({
        "error message": "All requested information is required.",
      });
    }

    try {
      const newUser = userRepository.create({
        name,
        email,
        password,
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
