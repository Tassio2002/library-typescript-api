import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { schemaValidation } from "../middlewares/schemaValidation";
import { UserSchema } from "../schemas/UserSchema";

const router = Router();
router.use(schemaValidation(UserSchema));
router.post("/signup", new UserController().signup);

export default router;
