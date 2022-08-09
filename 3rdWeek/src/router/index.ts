import express from "express";
import { Schema } from "mongoose";
import { memoModel, Memo, IMemo } from "../schema/memo";

let router = express.Router();

router.get("/", function (req, res, next) {
  res.render("index.html", { title: "Express" });
});

router.get("/load", function (req, res, next) {
  memoModel.find({}, function (err: any, data: typeof Memo) {
    res.json(data);
  });
});

router.post("/write", function (req, res, next) {
  console.log(req);
  let author: string = req.body.author;
  let contents: string = req.body.contents;
  let date = Date.now() as unknown as Date;

  let memo = new memoModel({
    author: author,
    contents: contents,
    date: date,
    comments: [],
  });

  memo.save(function (err) {
    if (err) {
      throw err;
    } else {
      res.json({ status: "SUCCESS" });
    }
  });
});

router.post("/del", async function (req, res, next) {
  let _id = req.body._id;
  try {
    await memoModel.remove({ _id: _id });
    res.json({ status: "SUCCESS" });
  } catch (e) {
    throw e;
  }
});

router.post("/modify", function (req, res, next) {
  var _id = req.body._id;
  var contents = req.body.contents;

  memoModel
    .updateOne({ _id: _id }, { contents: contents })
    .then((result) => {
      res.json({ status: "SUCCESS" });
    })
    .catch((e) => {
      throw e;
    });
});

export default router;
