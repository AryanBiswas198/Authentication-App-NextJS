import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest){
    try{
        const response = NextResponse.json({
            success: true,
            message: "Logged Out Successfully !!",
        }, {status: 200});

        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0),
        });

        return response;
    } catch(err: any){
        console.log("Internal Server Error while Logging out !!", err);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error while Logging out !!",
        }, {status: 500});
    }
}