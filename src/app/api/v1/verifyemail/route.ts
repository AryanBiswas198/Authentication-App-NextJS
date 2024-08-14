import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest){
    try{
        const {token} = await request.json();

        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});
        if(!user){
            return NextResponse.json({
                success: false,
                message: "Invalid User Details",
            }, {status: 404});
        }

        user.isVerified = true;
        user.verifyToken = "";

        await user.save();

        return NextResponse.json({
            success: true,
            message: "Email Verified Successfully",
        }, {status: 200});

    } catch(err: any){
        console.log("Internal Server Error while Verifying Email");
        return NextResponse.json({
            success: false,
            error: err.message,
        }, {status: 500});
    }
}