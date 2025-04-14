import { ListObjectsCommand, S3ServiceException } from "@aws-sdk/client-s3";
import { s3 } from "../../infra/aws/s3";
import Exception from "../../entities/Exception";
import { getObjectS3Name } from "../../helpers/getObjectS3Name.helper";
import { checkIfObjectIsImage } from "../../helpers/checkObjectMimetype.helper";

type GalleryImage = {
    id: string | undefined,
    name: string | undefined,
    size: number | undefined,
    lastModified: Date | undefined
}

export default async function listImagesServices(userId: string){
    try{
        let images: GalleryImage[] = [];
        const s3BucketName = process.env.S3_BUCKET_URL;

        const command = new ListObjectsCommand({
            Bucket: s3BucketName,
            Prefix: userId
        })

        const {Contents} = await s3.send(command);

        if(Contents){
            const directoryAsObjectIndex = 0;

            const s3Objects = Contents.filter(
                (object,idx) => 
                    idx != directoryAsObjectIndex &&
                    checkIfObjectIsImage(object.Key)
            );

            images = s3Objects.map(obj=>({
                id: obj.ETag,
                name: getObjectS3Name(obj.Key, userId),
                size: obj.Size,
                lastModified: obj.LastModified
            }))
        }

        return images;
    }catch(error:any){
        if (
            error instanceof S3ServiceException &&
            error.name === "NoSuchBucket"
        ) {
            throw new Exception(400, "The bucket doesn't exist.")
        } else if (error instanceof S3ServiceException) {
            throw new Exception(400, `Error from S3 while listing objects for bucket.  ${error.name}: ${error.message}`)
        } else {
            throw error;
        }
    }
}