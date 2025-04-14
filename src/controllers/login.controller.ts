import { Request, Response } from "express";
import loginService from "../services/login.service";
import Exception from "../entities/Exception";

export default async function loginController(req:Request,res:Response){
    try{
        const { authorization } = req.headers;

        const token = await loginService(authorization as string);

        res.status(200).json({
            message:"User authenticated with success",
            token
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