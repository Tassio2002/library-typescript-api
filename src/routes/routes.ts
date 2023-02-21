import { Router } from "express";
import { BookController } from "../controllers/BookController";
import { UserController } from "../controllers/UserController";
import { schemaValidation } from "../middlewares/schemaValidation";
import { UserSchema } from "../schemas/UserSchema";

const router = Router();
let signup = new UserController().signup

router.post("/signup", schemaValidation(UserSchema), new UserController().signup);
router.post("/book/:user_id/create", new UserController().createBook)
router.get("/book/all_books", new BookController().list)

export default router;
