import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";

export async function POST(request: NextRequest){
    try{
        const token = request.cookies.get("token")?.value || "";
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);

        const userId = decodedToken.id;

        const user = await User.findOne({_id: userId}).select("-password");

        console.log("Printing User Details", user);

        return NextResponse.json({
            success: true,
            message: "User Details Fetched Successfully",
            data: user,
        }, {status: 200});

    } catch(err: any){
        console.log("Internal Server Error while fetching user details");
        return NextResponse.json({
            success: false,
            error: err.message,
        }, {status: 500});
    }
}