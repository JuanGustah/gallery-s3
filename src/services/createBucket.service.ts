import { 
    BucketAlreadyExists, 
    CreateBucketCommand, 
    S3Client, 
    waitUntilBucketExists 
} from "@aws-sdk/client-s3";

import { WaiterConfiguration } from "@smithy/util-waiter";

import { s3 } from "../infra/aws/s3";

import Exception from "../entities/Exception";

export default async function createBucketService(bucketName: string){
    try{
        const {Location} = await s3.send(
            new CreateBucketCommand({
                Bucket: bucketName
            })
        )

        await waitUntilBucketExists({client:s3} as WaiterConfiguration<S3Client>, {Bucket:bucketName});

        return {
            location: Location
        }
    }catch(error){
        if(error instanceof BucketAlreadyExists){
            throw new Exception(400, "bucket already exists");
        }

        throw error;
    }
}