import { Router } from "express";
import listImagesController from "../controllers/gallery/listImages.controller";

const galleryRouter = Router();

galleryRouter.get("/list-images", listImagesController);

export {galleryRouter};