import jwt from 'jsonwebtoken';
import { envs } from './env';


interface UserP {
    name: string;
    email: string;
    password: string;
}

const Token = {
    createToken: (payload: string) => {
        return jwt.sign(payload, envs.JWT_ACCES_TOKEN? { expiresIn: '1h' });
    },

    verifyAccessToken: (token: string) => {
        return jwt.verify(token, envs.JWT_ACCES_TOKEN? as string)  
    },

    decodeAccessToken: (token: string): UserP => {
        const decoded = jwt.verify(token, envs.JWT_ACCES_TOKEN) as UserP;
        return decoded;
    }

}
export default Token;