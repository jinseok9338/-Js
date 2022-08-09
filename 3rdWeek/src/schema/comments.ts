import mongoose from "mongoose";

let Schema = mongoose.Schema;

export const Comments = new Schema({
  author: String,
  contents: String,
  date: Date,
});

export const commentsModel = mongoose.model("Comments", Comments);
