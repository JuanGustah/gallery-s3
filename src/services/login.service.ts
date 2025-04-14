import jwt from 'jsonwebtoken';

import { prisma } from "../infra/prisma";

import Exception from "../entities/Exception";

export default async function loginService(authorizationHeader:string){
    if(!authorizationHeader){
        throw new Exception(400, "No credentials was given")
    }

    const basicTokenBase64 = authorizationHeader.replace("Basic ", "");
    const basicTokenUtf8 = Buffer.from(basicTokenBase64, 'base64').toString('utf-8');
    const credentials = basicTokenUtf8.split(":");

    const username = credentials[0];
    const password = credentials[1];

    const user = await prisma.user.findFirst({
        where:{
            username,
            password
        }
    });

    if(!user){
        throw new Exception(400, "No user found");
    }

    const secretKey = process.env.JWT_SECRET as string;

    const token = jwt.sign(
        {
            username: JSON.stringify(username),
            userId: user.id
        },
        secretKey,
        { expiresIn: '60m' }
    )
    return token;
}