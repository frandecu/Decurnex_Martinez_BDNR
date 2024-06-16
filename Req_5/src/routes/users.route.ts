import express from "express";

import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/users.controller";

const UserRouter = express.Router();

UserRouter.post("/", createUser);
UserRouter.get("/", getAllUsers);
UserRouter.get("/:id", getUserById);
UserRouter.put("/:id", updateUser);
UserRouter.delete("/:id", deleteUser);

export default UserRouter;
