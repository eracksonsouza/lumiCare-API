import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { listMuralMessages, createMuralMessage } from "../controllers/muralController";
import { validateSchema } from "../middleware/validation";
import { muralMessageSchema } from "../lib/schemas";

const router = Router();

router.use(authMiddleware);

router.get("/", listMuralMessages);
router.post("/", validateSchema(muralMessageSchema), createMuralMessage);

export default router;
