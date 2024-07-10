// src/core/config/env.ts

import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
	PORT: get('PORT').required().asPortNumber(),
	API_PREFIX: get('DEFAULT_API_PREFIX').default('/api/v1').asString(),
	NODE_ENV: get('NODE_ENV').default('development').asString(),
	MONGO_INITDB_ROOT_USERNAME: get('MONGO_INITDB_ROOT_USERNAME').default('admin').asString(),
	MONGO_INITDB_ROOT_PASSWORD: get('MONGO_INITDB_ROOT_PASSWORD').default('test123').asString(),
	MONGO_DB_NAME: get('MONGO_DB_NAME').default('worketyamo').asString(),
	GMAIL_PASSWORD: "igpy zjax sshw ywmq",
	SEND_EMAIL: get('SEND_EMAIL'),
	JWT_ACCES_TOKEN: get('JWT_ACCES_TOKEN'),
	JWT_REFRESH_TOKEN: get('JWT_REFRESH_TOKEN'),
    JWT_SECRET: get('JWT_SECRET'),
};

export const CONNECTION_STRING = `mongodb://${envs.MONGO_INITDB_ROOT_USERNAME}:${envs.MONGO_INITDB_ROOT_PASSWORD}@172.28.0.2:27017/${envs.MONGO_DB_NAME}?authSource=admin`;


export const regex = {
    EMAIL_REGEX : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/,
    PASSWORD_REGEX : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,

    testRegex : (email:string):boolean => {
        return regex.EMAIL_REGEX.test(email);
    }
}