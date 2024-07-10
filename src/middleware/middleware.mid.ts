import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { HttpCode } from "../core/constants";
import Token from "../core/config/token.jwt";
import SendError from "../core/constants/error";

const prisma = new PrismaClient();

const middleware = {
    // verification of user's role
    roleUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params

            const user = await prisma.user.findUnique({
                where: {
                    user_id: id
                }
            })
            if (user && user.role === "SUPERADMIN") next()
            else res.json({ "msg": "Action not authorised" }).status(HttpCode.FORBIDDEN)
        } catch (error) {
            SendError(res, error)
        }
    },
    verifyUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const accesToken = req.headers.authorization
            const decodedPayload = Token.decodeAccessToken(accesToken)
            if (decodedPayload && 'name,email,password' in decodedPayload) {
                const user = await prisma.user.findFirst({
                    where: {
                        email: decodedPayload.email
                    }
                })
                if (user) next()
                else res.json({ "msg": "User not found" }).status(HttpCode.UNAUTHORIZED)
            }
        } catch (error) {
            SendError(res, error)
        }

    },
}

export default middleware