import User from "@/models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json();
        const {email, password} = reqBody;

        if(!email || !password){
            return NextResponse.json({
                success: false,
                message: "Please Provide all Details",
            }, {status: 404});
        }

        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({
                success: false,
                message: "User not found !!",
            }, {status: 404});
        }

        // Checks if user is Verified, if not, will return response to verify email first
        if(!user.isVerified){
            return NextResponse.json({
                success: false,
                message: "Please Verify your Email First",
            }, {status: 400});
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            return NextResponse.json({
                success: false,
                message: "Password does not match, Please Try Again !!",
            }, {status: 400});
        }

        const payload = {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        }

        const token = jwt.sign(payload, process.env.TOKEN_SECRET!, {
            expiresIn: "1d",
        });

        const response = NextResponse.json({
            success: true,
            message: "Logged In Successfully",
        }, {status: 200});

        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;
        
    } catch(err: any){
        console.log("Internal Server Error while Login");
        return NextResponse.json({
            success: false,
            error: err.message,
        }, {status: 500});
    }
}