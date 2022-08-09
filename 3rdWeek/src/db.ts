import mongoose from "mongoose";
import dotenv from "dotenv";

import { MongoClient, ServerApiVersion } from "mongodb";

let passwordforme = process.env.DBPASSWORD;

const uri = `mongodb+srv://jinseok9338:${passwordforme}@cluster0.lrqim.mongodb.net/?retryWrites=true&w=majority`;
const option = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};
export const connectToDB = () => {
  mongoose.connect(uri);
  var db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log("DB connected");
  });
};
