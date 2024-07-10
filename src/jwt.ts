import  jwt  from "jsonwebtoken";
import { envs } from "./core/config/env";



const Token = {
    generateToken(payload: any): string {
        return jwt.sign(payload, envs.NODE_ENV, { expiresIn: "1h" });
    },
    verifyToken(token: string): any {
        return jwt.verify(token, envs.NODE_ENV);
    },
    decodeToken(token: string): any {
        return jwt.decode(token);
    }
}