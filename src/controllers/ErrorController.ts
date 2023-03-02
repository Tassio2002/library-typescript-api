import { Request, Response } from "express";

export class ErrorController {
  async error404(req: Request, res: Response) {
    return res.status(404).json({ message: "Not found" });
  }
}