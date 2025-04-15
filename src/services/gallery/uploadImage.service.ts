import { PutObjectCommand, S3ServiceException } from "@aws-sdk/client-s3";
import { extractUserDataFromToken } from "../../helpers/extractUserDataFromToken.helper";
import { s3 } from "../../infra/aws/s3";
import { readFileSync, unlinkSync } from "fs";
import Exception from "../../entities/Exception";

export async function uploadImageService(bearerToken: string, file:Express.Multer.File | undefined){
    if(file == undefined){
        throw new Exception(400, "File was not given")
    }

    const {userId} = extractUserDataFromToken(bearerToken);
    const bucketName = process.env.S3_BUCKET_URL;

    const putObjectComand = new PutObjectCommand({
        Bucket:bucketName,
        Body: readFileSync(file.path),
        Key: `${userId}/${file.originalname}`,
    })

    try{
        await s3.send(putObjectComand);
    }catch(error: any){
        if (error instanceof S3ServiceException) {
            throw new Exception(500, "Error while uploading file")
        }else{
            throw new Exception(500, "Something wrong happened")
        }
    }finally{
        unlinkSync(file.path);
    }
}