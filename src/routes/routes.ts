import { Router } from "express";
import { BookController } from "../controllers/BookController";
import { UserController } from "../controllers/UserController";
import { schemaValidation } from "../middlewares/schemaValidation";
import { UserSchema } from "../schemas/UserSchema";

const router = Router();
const userController = new UserController()
const bookController = new BookController()

router.post("/signup", schemaValidation(UserSchema), userController.signup);
router.post("/book/:user_id/create", userController.createBook)
router.get("/book/all_books", bookController.list)

export default router;
