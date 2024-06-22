import { Router } from "express";

import { PrivacyRouter } from "./privacy.routes";

export const ApiRouter = Router();

ApiRouter.use("/activities", PrivacyRouter);
ApiRouter.get("/", (_req, res) => {
  res.send("API BDDNR 2024 - Francisco Decurnex, Tomas Martinez");
});
