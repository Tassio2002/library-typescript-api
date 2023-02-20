import { Request, Response } from "express";
import { schemaValidation } from "../middlewares/schemaValidation";
import { userRepository } from "../repositories/userRepository";
import { UserSchema } from "../schemas/UserSchema";
export class UserController {
  async signup(req: Request, res: Response) {
    const { name, email, password } = req.body;

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
