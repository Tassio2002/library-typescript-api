import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { schemaValidation } from "../middlewares/schemaValidation";
import { UserSchema } from "../schemas/UserSchema";

const router = Router();
const signup = new UserController().signup
const login = new UserController().login

router.post("/signup", schemaValidation(UserSchema), signup);
router.post("/login", login)
export default router;
