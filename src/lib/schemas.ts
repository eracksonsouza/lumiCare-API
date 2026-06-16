import { z } from "zod";

export const checkInSchema = z.object({
  emotion: z.enum(["happy", "calm", "neutral", "anxious", "sad"], {
    message: "A emoção deve ser: happy, calm, neutral, anxious ou sad",
  }),
  intensity: z
    .number({ message: "A intensidade é obrigatória" })
    .int("A intensidade deve ser um número inteiro")
    .min(1, "A intensidade mínima é 1")
    .max(10, "A intensidade máxima é 10"),
  timestamp: z
    .string({ message: "O timestamp é obrigatório" })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Formato de data/timestamp inválido",
    }),
});

export const journalEntrySchema = z.object({
  prompt: z
    .string({ message: "O prompt é obrigatório" })
    .trim()
    .min(1, "O prompt não pode estar vazio")
    .max(300, "O prompt deve ter no máximo 300 caracteres"),
  content: z
    .string({ message: "O conteúdo é obrigatório" })
    .trim()
    .min(1, "O conteúdo do diário não pode estar vazio")
    .max(5000, "O conteúdo do diário deve ter no máximo 5000 caracteres"),
});

export const muralMessageSchema = z.object({
  content: z
    .string({ message: "O conteúdo do bilhete é obrigatório" })
    .trim()
    .min(1, "O bilhete não pode estar vazio")
    .max(150, "O bilhete deve ter no máximo 150 caracteres"),
});

export const tokenCreateSchema = z.object({
  nickname: z
    .string()
    .trim()
    .max(50, "O apelido deve ter no máximo 50 caracteres")
    .optional(),
});
