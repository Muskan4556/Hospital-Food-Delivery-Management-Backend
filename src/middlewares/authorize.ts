import { NextFunction, Request, Response } from "express";

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      if (!req.role || !roles.includes(req.role)) {
        res.status(403).json({ message: "Unauthorized" });
        return;
      }
      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
};
