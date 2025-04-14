import { Router } from "express";
import createBucketController from "../controllers/createBucket.controller";

const adminRouter = Router();

adminRouter.post("/create-bucket", createBucketController);

export {adminRouter};