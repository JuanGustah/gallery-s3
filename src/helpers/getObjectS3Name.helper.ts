export function getObjectS3Name(key: string | undefined, prefix: string){
    if(!key) return undefined;

    return key.replace(`${prefix}/`, "");
}