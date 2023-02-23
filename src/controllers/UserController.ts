import { Request, Response } from "express";
import { encrypt } from "../security/encrypt";
import { decryptPassword } from "../security/decrypt";
import { userRepository } from "../repositories/userRepository";
import jwt from 'jsonwebtoken'
export class UserController {
  async signup(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const userExists= await userRepository.findOneBy({ email })

    if (userExists) {
      return res.status(400).json({ message: "User already exists" })
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

  async login(req: Request, res: Response) {
    const { email, password } = req.body

    const user = await userRepository.findOneBy({ email })
    console.log("user: " + user)
  
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" })
    }

    const verifyPassword = await decryptPassword(password, user.password)
    console.log("password: " + user.password)
    console.log("password: " + verifyPassword)
    if (!verifyPassword) {
      return res.status(401).json({ message: "Invalid email or password" })
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? '', {
      expiresIn: 200
    })
    console.log("token: " + token)
    const { password: _, ...userLogin } = user

    return res.status(200).json({
      user: userLogin,
      token: token
    })
  }
}
