import { Request, Response, NextFunction } from "express";

export function globalErrorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error("Erro capturado globalmente:", err);

  const status = err.status || err.statusCode || 500;
  const message = status === 500 ? "Erro interno do servidor" : err.message;

  res.status(status).json({
    error: message,
  });
}
