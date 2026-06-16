import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import {
  listJournalEntries,
  createJournalEntry,
  deleteJournalEntry,
} from "../controllers/journalController";
import { validateSchema } from "../middleware/validation";
import { journalEntrySchema } from "../lib/schemas";

const router = Router();

router.use(authMiddleware);
router.get("/", listJournalEntries);
router.post("/", validateSchema(journalEntrySchema), createJournalEntry);
router.delete("/:id", deleteJournalEntry);

export default router;
