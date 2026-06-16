import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

const MAX_CONTENT_LENGTH = 200;

export async function listMuralMessages(_req: Request, res: Response) {
  try {
    const messages = await prisma.muralMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    res.json(messages);
  } catch {
    res.status(500).json({ error: "Erro ao buscar mensagens do mural" });
  }
}

export async function createMuralMessage(req: Request, res: Response) {
  try {
    const { content } = req.body as { content: string };

    const message = await prisma.muralMessage.create({
      data: {
        content: content.trim(),
      },
    });

    res.status(201).json(message);
  } catch {
    res.status(500).json({ error: "Erro ao publicar mensagem no mural" });
  }
}
