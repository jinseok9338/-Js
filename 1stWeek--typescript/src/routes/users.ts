import { NextFunction, Response, Request } from "express";
import express, { Router } from "express";

let router = Router();

/* GET users listing. */
router.get("/", (request: Request, response: Response, next: NextFunction) => {
  response.send("respond with a resource");
});

export default router;
