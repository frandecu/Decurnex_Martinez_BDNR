import express, { Request, Response } from "express";
import mongoose from "mongoose";

const app = express();
const PORT = 3000;

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/User";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`);
});
