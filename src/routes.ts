import { Router } from "express";

import { adminRouter } from "./routes/admin.router";
import { galleryRouter } from "./routes/gallery.router";
import { authRouter } from "./routes/auth.router";

import { mustBeLogged } from "./middlewares/logged.middleware";

const router = Router();

router.get("/health", (req,res)=>{
    res.status(200).json({
        status: "Healthy"
    })
})

router.use("/admin", adminRouter);
router.use("/gallery", mustBeLogged, galleryRouter);
router.use("/auth",authRouter);

export {
    router as apiRouter
};