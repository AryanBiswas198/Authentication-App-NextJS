import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import User from "@/models/userModel";

export const sendEmail = async({email, emailType, userId}: any) => {
    try{
        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        if(emailType === 'VERIFY'){
            await User.findByIdAndUpdate(userId, {
                $set: {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000,
                }
            })
        }
        else if(emailType === 'RESET'){
            await User.findByIdAndUpdate(userId, {
                $set: {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000,
                }
            })
        }

        var transport = nodemailer.createTransport({
            host: process.env.MAIL_HOST, 
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });

        const mailOptions = {
            from: 'aryanb198@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify your Email' : 'Reset your Password',
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">Here</a> to ${emailType === 'VERIFY' ? "verify your email" : "reset your password"} 
                        or copy and paste the link below to your browser . <br>
                        ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`,
          }

          const mailResponse = await transport.sendMail(mailOptions);
          return mailResponse;

    } catch(err: any){
        console.log("Internal Server Error while sending Email !!");
        return NextResponse.json({
            success: false,
            error: err.message,
        }, {status: 500});
    }
}