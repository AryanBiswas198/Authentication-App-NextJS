import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { sendEmail } from "@/helpers/mailer";
import { connect } from "@/dbConfig/dbConfig";


export async function POST(request: NextRequest){

    await connect();
    try{
        const reqBody = await request.json();
        const {firstName, lastName, email, password} = reqBody;

        if(!firstName || !lastName || !email || !password){
            return NextResponse.json({
                success: false,
                message: "Please Provide all the Details !!",
            }, {status: 400});
        }

        const user = await User.findOne({email});
        if(user){
            return NextResponse.json({
                success: false,
                message: "User already exists !!",
            }, {status: 400});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName, 
            lastName,
            email, 
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        console.log(savedUser);


        // Send Verification Email
        await sendEmail({email, emailType: 'VERIFY', userId: savedUser._id});

        return NextResponse.json({
            success: true,
            message: "Signup Successful, Please Verify your email",
        }, {status: 200});

    } catch(err: any){
        console.log("Internal Server Error in SignUp");
        return NextResponse.json({
            success: false,
            error: err.message,
        }, {status: 500});
    }
}