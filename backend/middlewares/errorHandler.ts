import { type NextFunction, type Request, type Response } from 'express';

export const errorHandler = (e: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.log('Error :>> ', e);
  let code = 500;
  let error = e.message;

  return res.status(code).send({ error });
};
