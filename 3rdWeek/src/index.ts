import express from "express";
import { connectToDB } from "./db";
import createError from "http-errors";
import IndexRouter from "./router/index";
import path from "path";

const app = express();

app.set("views", __dirname + "/views");
app.engine("html", require("ejs").renderFile);
app.use(express.static(path.join(__dirname, "public")));

app.use("/", IndexRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

connectToDB(); // this allows to connect to MongoDB

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
