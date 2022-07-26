import { NextFunction, Response, Request } from "express";
import express, { Router } from "express";

let router = Router();

/* GET home page. */
router.get(
  "/",
  (_request: Request, response: Response, _next: NextFunction) => {
    response.render("index.html", { title: "Main" });
  }
);

router.get(
  "/test",
  (_request: Request, response: Response, _next: NextFunction) => {
    response.render("test.html", { title: "Test" });
  }
);

export default router;
