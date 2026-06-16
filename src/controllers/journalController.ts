import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

const MAX_PROMPT_LENGTH = 300;
const MAX_CONTENT_LENGTH = 5000;

export async function listJournalEntries(_req: Request, res: Response) {
  try {
    const tokenId = res.locals.tokenId as string;
    const entries = await prisma.journalEntry.findMany({
      where: { tokenId },
      orderBy: { createdAt: "desc" },
    });
    res.json(entries);
  } catch {
    res.status(500).json({ error: "Erro ao buscar entradas do diário" });
  }
}

export async function createJournalEntry(req: Request, res: Response) {
  try {
    const tokenId = res.locals.tokenId as string;
    const { prompt, content } = req.body as { prompt: string; content: string };

    const entry = await prisma.journalEntry.create({
      data: { prompt: prompt.trim(), content: content.trim(), tokenId },
    });
    res.status(201).json(entry);
  } catch {
    res.status(500).json({ error: "Erro ao criar entrada do diário" });
  }
}

export async function deleteJournalEntry(req: Request, res: Response) {
  try {
    const tokenId = res.locals.tokenId as string;
    const { id } = req.params;

    const entry = await prisma.journalEntry.findFirst({ where: { id, tokenId } });
    if (!entry) {
      res.status(404).json({ error: "Entrada não encontrada" });
      return;
    }

    await prisma.journalEntry.delete({ where: { id } });
    res.status(204).send();
  } catch {
    res.status(500).json({ error: "Erro ao deletar entrada do diário" });
  }
}
