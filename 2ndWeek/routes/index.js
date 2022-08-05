import { NextFunction, Response, Request } from "express";
import express, { Router } from "express";

let router = Router();

/* GET home page. */
router.get("/", (_request, response, _next) => {
  response.render("index.html", { title: "Main" });
});
