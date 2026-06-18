import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import {
  listMuralMessages,
  createMuralMessage,
  updateMuralMessage,
  deleteMuralMessage,
} from "../controllers/muralController";
import { validateSchema } from "../middleware/validation";
import { muralMessageSchema, muralUpdateSchema } from "../lib/schemas";

const router = Router();

router.use(authMiddleware);

router.get("/", listMuralMessages);
router.post("/", validateSchema(muralMessageSchema), createMuralMessage);
router.patch("/:id", validateSchema(muralUpdateSchema), updateMuralMessage);
router.delete("/:id", deleteMuralMessage);

export default router;
