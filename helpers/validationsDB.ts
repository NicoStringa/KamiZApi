import User ,{ IUser } from "../models/user"
import { sendEmail } from "../mailer/mailer";

export const existingEmail = async ( email: string): Promise<void> =>{
    const existEmail: IUser | null = await User.findOne({email});

    if(existEmail && existEmail.verified){
        throw new Error(`The email ${email} alredy exist`)
    }

    if(existEmail && !existEmail.verified){
        await sendEmail(email, existEmail.code as string)
        throw new Error(`The user is alredy registered, a verification code has been send to ${email}`)
    }
}