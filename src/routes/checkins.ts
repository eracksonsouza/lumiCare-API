import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { listCheckIns, createCheckIn, deleteCheckIns } from "../controllers/checkinsController";
import { validateSchema } from "../middleware/validation";
import { checkInSchema } from "../lib/schemas";

const router = Router();

router.use(authMiddleware);

router.get("/", listCheckIns);
router.post("/", validateSchema(checkInSchema), createCheckIn);
router.delete("/", deleteCheckIns);

export default router;
