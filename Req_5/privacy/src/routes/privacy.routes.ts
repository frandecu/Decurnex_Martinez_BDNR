import { Router } from "express";

import { PrivayController } from "../controllers/privacy.controller";
import { tryCatchWrapper } from "../middlewares";

export const PrivacyRouter = Router();

PrivacyRouter.post("/");
PrivacyRouter.get("/:userId/:gameId");
PrivacyRouter.get("/");
