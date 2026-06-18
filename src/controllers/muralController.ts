import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

const MAX_CONTENT_LENGTH = 150;

export async function listMuralMessages(_req: Request, res: Response) {
  try {
    const messages = await prisma.muralMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    res.json(messages);
  } catch {
    res.status(500).json({ error: "Erro ao buscar mensagens do mural" });
  }
}

export async function createMuralMessage(req: Request, res: Response) {
  try {
    const { content, color, posX, posY } = req.body as {
      content: string;
      color?: string;
      posX?: number;
      posY?: number;
    };

    const message = await prisma.muralMessage.create({
      data: {
        content: content.trim(),
        color: color ?? "#FFF9C4",
        posX: posX ?? Math.random() * 1400,
        posY: posY ?? Math.random() * 700,
        isHighlighted: false,
      },
    });

    res.status(201).json(message);
  } catch {
    res.status(500).json({ error: "Erro ao publicar mensagem no mural" });
  }
}

export async function updateMuralMessage(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { posX, posY, isHighlighted } = req.body as {
      posX?: number;
      posY?: number;
      isHighlighted?: boolean;
    };

    const message = await prisma.muralMessage.update({
      where: { id },
      data: {
        ...(posX !== undefined && { posX }),
        ...(posY !== undefined && { posY }),
        ...(isHighlighted !== undefined && { isHighlighted }),
      },
    });

    res.json(message);
  } catch {
    res.status(500).json({ error: "Erro ao atualizar mensagem do mural" });
  }
}

export async function deleteMuralMessage(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await prisma.muralMessage.delete({ where: { id } });
    res.status(204).send();
  } catch {
    res.status(500).json({ error: "Erro ao remover mensagem do mural" });
  }
}
