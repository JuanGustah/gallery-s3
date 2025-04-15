import jwt from "jsonwebtoken";

type userDataFromToken = {
    username: string;
    userId: string;
}

export function extractUserDataFromToken(bearerToken: string): userDataFromToken{
    try{
        const secretKey = process.env.JWT_SECRET!;

        const jwtToken = bearerToken.split(" ")[1];

        const decoded:any = jwt.verify(jwtToken, secretKey);

        return decoded;
    }catch(error){
        throw new Error(
            "credentials invalid"
        )
    }
}