import { Request, Response } from "express";

import Exception from "../entities/Exception";

import createBucketService from "../services/createBucket.service";

export default async function createBucketController(req:Request, res: Response) {
    try{
        const body = req.body;

        const {location} = await createBucketService(body.bucketName as string);

        res.status(200).json({
            message: `bucket created on location ${location}`
        })
    }catch(error: any){
        let errorStatus = 500;
        let errorMessage = "Something wrong happened";

        if(error instanceof Exception){
            errorStatus = error.status;
            errorMessage = error.errorMessage;
        }
        
        console.log("Error:", error);
        res.status(errorStatus).json({
            error: errorMessage
        })
    }
}

