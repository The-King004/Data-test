import  bcrypt  from 'bcrypt';
import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import { HttpCode } from "../core/constants"
import sendMail from '../core/config/sendmail';
// import Token from '../core/config/token.jwt';
import { otpGenerate } from '../core/config/otp.generator';
import SendError from '../core/constants/error';



const Prisma = new PrismaClient()

const controllers = {
    getAllUsers : async (req:Request, res:Response ) => {
            try {
                const users = await Prisma.user.findMany();
                res.json(users).status(HttpCode.OK);
            } catch (error) {
                console.error(error);
                res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
            }
    },
    getOneUser: async (req: Request, res: Response) => {
        try {
            const { id } = req.params; 
            const user = await Prisma.user.findUnique({ 
                where: { user_id: id }
            });
            if (!user) {
                return res.status(HttpCode.NOT_FOUND).json({ message: 'User not found' });
            }
            res.json(user).status(HttpCode.OK);
        } catch (error) {
            console.error(error);
            res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
        }
    },
    createUser: async (req: Request, res: Response) => {
        try {
            const { name, email, age, password, role } = req.body

            if (!name || !email || !password)
                res.status(HttpCode.BAD_REQUEST).json({ "msg": "veillez remplir ces champs" })

            const Hash = await bcrypt.hash(password, 12)

            const code_otp = parseInt(otpGenerate())
            const otpExpiredAt = new Date(Date.now() + 10 * 60 * 1000).toISOString()
            const user = await Prisma.user.create({
                data: {
                    name,
                    email,
                    age,
                    password: Hash,
                    role,
                },
            })
            const updateUser = await Prisma.user.update({
                where: {
                    email: user.email
                },
                data: {
                    code_otp,
                    otpExpiredAt,
                },
            })
            if (user) {
                sendMail(email, "Connection a Web Industry", `code de validation ${code_otp}`)
                res.json({ "message": "utilisateur créé avec succès" })
                console.log(updateUser)
            } else res.send({ msg: "impossible de créer l'utilisateur" })
        } catch (error) {
            SendError(res, error)
        }
    },
    modifyUser: async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const { name, email, password, role } = req.body
            const updateUser = await Prisma.user.update({
                where: {
                    user_id: id
                },
                data: {
                    name,
                    email,
                    password,
                    role
                },
            })
            if (updateUser) {
                res.json({ msg : "les informations de l'utilisateur ont été modifiées avec succès" })
                console.log(updateUser)
            }
            else res.send({ msg: "impossible de modifier les infos du user" })
        } catch (error) {
            SendError(res, error)
        }
    },
     deleteOneUser: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await Prisma.user.delete({ where: { user_id: id } });
            res.status(HttpCode.NO_CONTENT).end();
        } catch (error) {
            console.error(error);
            res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ msg: 'Internal Server Error' });
        }
    }
    ,
    deleteAllUsers: async (req: Request, res: Response) => {
        try {
            await Prisma.user.deleteMany();
            res.status(HttpCode.NO_CONTENT).end();
        } catch (error) {
            console.error(error);
            res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ msg: 'Internal Server Error' });
        }
    },

}



export default controllers