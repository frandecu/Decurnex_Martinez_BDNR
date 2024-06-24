import express, { Request, Response } from "express";
import mongoose from "mongoose";

import UserRouter from "./routes/users.route";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
const PORT = 3001;

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/User";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

app.use(express.json());
app.use("/user", UserRouter);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`);
});
