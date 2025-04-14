import { Router } from "express";
import loginController from "../controllers/login.controller";

const authRouter = Router();

authRouter.post("/login", loginController);

export {authRouter};