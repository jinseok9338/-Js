import mongoose from "mongoose";

let Schema = mongoose.Schema;

let Memo = new Schema({
  author: String,
  contents: String,
  date: Date,
});

export const memoModel = mongoose.model("Memo", Memo);
