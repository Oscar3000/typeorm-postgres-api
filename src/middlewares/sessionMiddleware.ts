import { Request, Response, NextFunction } from "express";

export const session = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session!.userId) {
    res.status(401).send();
    return;
  }
  next();
};
