import { NextFunction, Request, Response } from "express";

const expressAsyncHandler = (
  func: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch(next);
  };
};

export default expressAsyncHandler;
