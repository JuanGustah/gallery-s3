import { Router } from "express";
import { adminRouter } from "./routes/admin.router";

const router = Router();

router.get("/health", (req,res)=>{
    res.status(200).json({
        status: "Healthy"
    })
})

router.use("/admin",adminRouter);

export {
    router as apiRouter
};