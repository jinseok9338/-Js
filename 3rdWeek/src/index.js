import express from "express";
import db from "./db";

const port = process.env.PORT || 3031;
const app = express();

db.connect();

app.listen(port, () => console.log(`listening on port ${port}`));
