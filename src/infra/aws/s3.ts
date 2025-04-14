import { S3Client } from "@aws-sdk/client-s3";
import { fromEnv } from "@aws-sdk/credential-providers";

const s3 = new S3Client({
    region: 'us-east-1',
    credentials: fromEnv()
})

export { s3 };