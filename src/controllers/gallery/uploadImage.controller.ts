import { Request, Response } from "express";

import Exception from "../../entities/Exception";

import { uploadImageService } from "../../services/gallery/uploadImage.service";

export async function uploadImageController(req: Request,res: Response){
    try{
        const bearerToken = req.headers.authorization as string;
        const file = req.file;

        await uploadImageService(bearerToken, file);

        res.status(200).json({
            message: "file uploaded with sucess"
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