import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
}

async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;
  const { secret_token } = auth;

  if (!authHeader) {
    throw new AppError("token missing", 401);
  }

  const [, token] = authHeader.split("Bearer ");

  try {
    const { sub: user_id } = verify(token, secret_token) as IPayload;

    request.user = { id: user_id };

    next();
  } catch (err) {
    throw new AppError("Invalid token", 401);
  }
}

export { ensureAuthenticated };
