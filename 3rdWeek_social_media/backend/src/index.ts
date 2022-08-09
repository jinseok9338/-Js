import express from "express";
import { connectToDB } from "./db";
import createError from "http-errors";
import IndexRouter from "./router/index";
import path from "path";
import bodyParser from "body-parser";

const app = express();

//html 템플릿을 쓸수 있게 해주는 엔진
app.set("views", __dirname + "/views");
app.engine("html", require("ejs").renderFile);

// public folder 를 지정해서 css, 나 다른 static 파일들을 쓸수 있게 해두는 미들웨어
app.use(express.static(path.join(__dirname, "public")));

// req의 json 을 읽을수 있게 해주는 미들웨어
// urlencoded 옵션에 관한 내용 https://sjh836.tistory.com/154... 나도 뭔지 모르지만 일단 쓰자
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// "/" 에 상응하는 route
app.use("/", IndexRouter);

// 404 페이지를 위한 미들웨어
app.use(function (req, res, next) {
  next(createError(404));
});

// this allows to connect to MongoDB
connectToDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
