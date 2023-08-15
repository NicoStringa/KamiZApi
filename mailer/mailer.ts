import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "nicostringadev@gmail.com",
        pass: "uuyijflzcacpizvx"
    },
    from: "nicostringadev@gmail.com"
})

export const sendEmail =async (to:string, code:string):Promise<void> => {
    try {
        const mailOptions = {
            from: 'KamiZ nicostringadev@gmail.com',
            to,
            subject: "Verification Code",
            text: `
            Your verification code for your KamiZ account.
            The code is : ${code}
            `
        }

        await transporter.sendMail(mailOptions)
        console.log("Email send")
    } catch (error) {
        console.error("Error sending email", error)
    }    
}