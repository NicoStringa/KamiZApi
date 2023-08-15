import { Request, Response } from "express";
import User, {IUser} from "../models/user";
import { ROLES } from "../helpers/constans";
import bcryptjs from "bcryptjs"
import randomstring from "randomstring"
import { sendEmail } from "../mailer/mailer";
import generateJWT from "../helpers/generateJWT";


export const register =async (req:Request, res:Response):Promise<void> => {

    const {name, email, password }: IUser = req.body

    const user = new User({name, email, password })

    const salt = bcryptjs.genSaltSync()

    user.password = bcryptjs.hashSync(password, salt)

    const adminKey = req.headers["admin-key"]

    if(adminKey === process.env.KEYFORADMIN){
        user.rol = ROLES.admin
    }

    const newCode = randomstring.generate(6)

    user.code= newCode

    await user.save()

    await sendEmail(email, newCode)

    res.status(201).json({
        user
    })
}

export const veriyUser =async (req:Request, res:Response):Promise<void> => {
    const { email, code } = req.body

    try {
        const user = await User.findOne({email})

        if(!user){
            res.status(400).json({
                msg: "Can't find the email in the database"
            })
            return
        }

        if(user.verified){
            res.status(400).json({
                msg: "User is verified"
            })
            return
        }

        if(user.code !== code){
            res.status(401).json({
                msg: "Incorrect code, please try again"
            })
            return
        }

        await User.findOneAndUpdate({email}, {verified: true})

        res.status(200).json({
            msg: "User verified successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Server error"
        })
    }
}

export const login =async (req:Request, res:Response):Promise<void> => {
    const { email, password }:IUser = req.body

    try {
        const user = await User.findOne({email})

        if(!user){
            res.status(400).json({
                msg: "Can't find the email in the database"
            });
            return
        }
        
        const validatePassword = bcryptjs.compareSync(password, user.password)

        if(!validatePassword){
            res.status(400).json({
                msg: "Incorrect password, please try again"
            });
            return
        }

        const token = await generateJWT(user.id)

        res.json({
            user,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Server error"
        })
    }
}