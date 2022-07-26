import express from "express";
import { NextFunction, Response, Request, Application } from "express";
import createError from "http-errors";
import path from "path";

import IndexRouter from "./routes/index";
import UsersRouter from "./routes/users";

const app: Application = express();

// view engine setup

app.set("views", __dirname + "/views");
app.engine("html", require("ejs").renderFile);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", IndexRouter);
app.use("/users", UsersRouter);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
