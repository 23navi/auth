import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import { fromZodError } from "zod-validation-error";

const validateResource = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      if (!result.success) {
        // return res.status(400).send(result.error);
        return res.status(400).send(fromZodError(result.error).details);
      }
      next();
    } catch (e: any) {
      return res.status(400).send(e.errors);
    }
  };
};

export default validateResource;
