import mongoose from "mongoose";

let passwordforme = process.env.DBPASSWORD;

const uri = `mongodb+srv://jinseok9338:${passwordforme}@cluster0.lrqim.mongodb.net/?retryWrites=true&w=majority`;

export const connectToDB = () => {
  mongoose.connect(uri);
  var db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log("DB connected");
  });
};
