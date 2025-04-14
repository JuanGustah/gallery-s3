import { Request, Response } from "express";

import Exception from "../../entities/Exception";

import listImagesServices from "../../services/gallery/listImages.service";

export default async function listImagesController(req: Request, res:Response){
    try{
        const body = req.body;

        const userId: string = body.userId;

        const images = await listImagesServices(userId);

        res.status(200).json({
            data: images
        })
    }catch(error:any){
        let errorStatus = 500;
        let errorMessage = "Something wrong happened";

        if(error instanceof Exception){
            errorStatus = error.status;
            errorMessage = error.errorMessage;
        }
        
        res.status(errorStatus).json({
            error: errorMessage
        })
    }
}