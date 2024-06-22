import express from "express";

import {
  createUser,
  getAllUsers,
  getUserByEmail,
  updateUser,
  deleteUser,
} from "../controllers/users.controller";

const UserRouter = express.Router();

UserRouter.post("/", createUser);
UserRouter.get("/", getAllUsers);
UserRouter.get("/:email", getUserByEmail);
UserRouter.put("/:id", updateUser);
UserRouter.delete("/:id", deleteUser);

export default UserRouter;
