import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { schemaValidation } from "../middlewares/schemaValidation";
import { UserSchema } from "../schemas/UserSchema";

const router = Router();
let signup = new UserController().signup

router.post("/signup", schemaValidation(UserSchema), signup);

export default router;
