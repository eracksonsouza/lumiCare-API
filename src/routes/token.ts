import { Router } from "express";
import { createToken } from "../controllers/tokenController";
import { validateSchema } from "../middleware/validation";
import { tokenCreateSchema } from "../lib/schemas";

const router = Router();

router.post("/", validateSchema(tokenCreateSchema), createToken);

export default router;
