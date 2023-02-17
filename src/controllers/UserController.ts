import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import { UserSchema } from "../schemas/UserSchema";

export class UserController {
  async signup(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const requestValidation = UserSchema.safeParse({
      name,
      email,
      password,
    });

    if (requestValidation.success !== true) {
      const errorMessage = requestValidation.error.issues[0].message;
      return res.status(400).json(errorMessage);
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
