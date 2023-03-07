import { Router } from "express";
import { BookController } from "../controllers/BookController";
import { ErrorController } from "../controllers/ErrorController";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authLogin";
import { schemaValidation } from "../middlewares/schemaValidation";
import { BookSchema } from "../schemas/BookSchema";
import { LoginSchema } from "../schemas/LoginSchema";
import { UserSchema } from "../schemas/UserSchema";
import { SearchSchema } from "../schemas/SearchSchema";

const router = Router();
const userController = new UserController();
const bookController = new BookController();
const errorController = new ErrorController();

router.post("/signup", schemaValidation(UserSchema), userController.signup);
router.post("/login", schemaValidation(LoginSchema), userController.login);
router.use(authMiddleware);
router.get("/user/all_users", userController.list);
router.get("/book/all_books", bookController.list);
router.post(
  "/book/:user_id/create",
  schemaValidation(BookSchema),
  userController.createBook
);
router.get(
  "/book/search_book",
  schemaValidation(SearchSchema),
  bookController.searchBookByTitle
);
router.post(
  "/create_reserve/:user_logged/:book_id",
  bookController.createReserve
);
router.post(
  "/book/book_devolution/:user_id/:book_id",
  bookController.bookDevolution
);

router.get("*", errorController.error404);
export default router;
