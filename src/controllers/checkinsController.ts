import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

const VALID_EMOTIONS = ["happy", "calm", "neutral", "anxious", "sad"] as const;

export async function listCheckIns(_req: Request, res: Response) {
  try {
    const tokenId = res.locals.tokenId as string;
    const checkIns = await prisma.checkIn.findMany({
      where: { tokenId },
      orderBy: { timestamp: "desc" },
      take: 100,
    });
    res.json(checkIns);
  } catch {
    res.status(500).json({ error: "Erro ao buscar check-ins" });
  }
}

export async function createCheckIn(req: Request, res: Response) {
  try {
    const tokenId = res.locals.tokenId as string;
    const { emotion, intensity, timestamp } = req.body as {
      emotion: "happy" | "calm" | "neutral" | "anxious" | "sad";
      intensity: number;
      timestamp: string;
    };

    const parsedDate = new Date(timestamp);
    const now = new Date();
    if (parsedDate > now) {
      res.status(400).json({ error: "Timestamp não pode ser no futuro" });
      return;
    }

    const checkIn = await prisma.checkIn.create({
      data: { emotion, intensity, timestamp: parsedDate, tokenId },
    });

    const count = await prisma.checkIn.count({ where: { tokenId } });
    if (count > 100) {
      const oldest = await prisma.checkIn.findMany({
        where: { tokenId },
        orderBy: { timestamp: "asc" },
        take: count - 100,
        select: { id: true },
      });
      await prisma.checkIn.deleteMany({ where: { id: { in: oldest.map((c) => c.id) } } });
    }

    const shouldShowInterventions = ["anxious", "sad"].includes(emotion) && intensity >= 6;
    res.status(201).json({ ...checkIn, shouldShowInterventions });
  } catch {
    res.status(500).json({ error: "Erro ao criar check-in" });
  }
}

export async function deleteCheckIns(_req: Request, res: Response) {
  try {
    const tokenId = res.locals.tokenId as string;
    await prisma.checkIn.deleteMany({ where: { tokenId } });
    await prisma.syncToken.delete({ where: { id: tokenId } });
    res.status(204).send();
  } catch {
    res.status(500).json({ error: "Erro ao deletar dados" });
  }
}
