import { Request, Response } from "express";
import { encrypt } from "../security/encrypt";
import { userRepository } from "../repositories/userRepository";
export class UserController {
  async signup(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const userExists= await userRepository.findOneBy({ email })

    if (userExists) {
      return res.status(400).json({ message: "User already exists"})
    }

    const passwordHash = await encrypt(password);

    try {
      const newUser = userRepository.create({
        name,
        email,
        password: passwordHash,
      });
      await userRepository.save(newUser);

      const { password: _, ...user} = newUser

      return res.status(201).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        "error message": "Internal Server Error",
      });
    }
  }
}
