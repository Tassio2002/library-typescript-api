import { Router } from "express";
import { BookController } from "../controllers/BookController";
import { ErrorController } from "../controllers/ErrorController";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authLogin";
import { schemaValidation } from "../middlewares/schemaValidation";
import { BookSchema } from "../schemas/BookSchema";
import { LoginSchema } from "../schemas/LoginSchema";
import { UserSchema } from "../schemas/UserSchema";

const router = Router();
const userController = new UserController();
const bookController = new BookController();
const errorController = new ErrorController();

router.post("/signup", schemaValidation(UserSchema), userController.signup);
router.post("/login", schemaValidation(LoginSchema), userController.login);
router.post(
  "/create_reserve/:user_logged/:book_id",
  bookController.createReserve
);
router.get("/user/all_users", userController.list);

router.use(authMiddleware);

router.post(
  "/book/:user_id/create",
  schemaValidation(BookSchema),
  userController.createBook
);
router.get("/book/all_books", bookController.list);

router.get("*", errorController.error404);
export default router;
