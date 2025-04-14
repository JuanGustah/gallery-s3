export function checkIfObjectIsImage(key:string|undefined){
    const mimetypesPermited =[
        ".jpg",
        ".png",
        ".jpeg"
    ]

    if(!key) return false;

    const mimetype = key.match(/\.[0-9a-z]+$/i)![0];

    return mimetypesPermited.includes(mimetype);
}