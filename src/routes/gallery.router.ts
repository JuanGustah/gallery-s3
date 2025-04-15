import { Router } from "express";

import listImagesController from "../controllers/gallery/listImages.controller";
import { uploadImageController } from "../controllers/gallery/uploadImage.controller";

import { uploadMiddleware } from "../infra/multer";

const galleryRouter = Router();

galleryRouter.get("/list-images", listImagesController);
galleryRouter.post("/upload-image", uploadMiddleware, uploadImageController);

export {galleryRouter};