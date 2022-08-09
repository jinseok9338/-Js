import mongoose, { model } from "mongoose";

let Schema = mongoose.Schema;

export interface IMemo {
  author: string;
  contents: string;
  // Use `Types.ObjectId` in document interface...
  date: Date;
  comments: string[];
}

export const Memo = new Schema<IMemo>({
  author: { type: String, required: true },
  contents: String,
  date: Date,
  comments: [String],
});

export const memoModel = model("Memo", Memo);
