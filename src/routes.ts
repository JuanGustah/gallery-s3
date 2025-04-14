import { Router } from "express";
import { adminRouter } from "./routes/admin.router";
import { galleryRouter } from "./routes/gallery.router";

const router = Router();

router.get("/health", (req,res)=>{
    res.status(200).json({
        status: "Healthy"
    })
})

router.use("/admin",adminRouter);
router.use("/gallery",galleryRouter);

export {
    router as apiRouter
};