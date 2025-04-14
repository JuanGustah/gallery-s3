import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

export function mustBeLogged(req: Request,res: Response,next: NextFunction){
    try{
        const secretKey = process.env.JWT_SECRET!; 

        const headers = req.headers;
        const authorization = headers['authorization'];
        const token = authorization?.split(" ")[1]!;

        if(!authorization){
            throw new Error();
        }

        jwt.verify(token, secretKey);
        next();
    }catch(error){
        res.status(400).json({
            error: "credentials invalid"
        })
    }
}