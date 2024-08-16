"use client"

import { toast } from "@/components/ui/use-toast";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import RetroGrid from "@/components/magicui/retro-grid";

const VerifyEmailPage = () => {

    const router = useRouter();
    const [token, setToken] = useState<any>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [isVerified, setIsVerified] = useState<boolean>(false);

    const verifiedUserEmail = async() => {
        setLoading(true);
        try{
            const response = await axios.post<ApiResponse>(`/api/v1/verifyemail`, {token});
            console.log("User Verified Successfully");

            setIsVerified(true);

            toast({
                title: "User Verified Successfully",
            });

            setTimeout(() => {
                router.push(`/profile`);
            }, 5000);

        } catch(err){
            console.log("Error while verifying User: ", err);
            const axiosError = err as AxiosError<ApiResponse>;

            let errorMessage = axiosError.response?.data?.message;

            toast({
                variant: "destructive",
                title: "Uh oh! Something Went Wrong",
                description: errorMessage,
            });
        } finally {
            setLoading(false);
        }
    }


    // For Fetching Token from URL
    useEffect(() => {
        const urlToken = window.location.search.split('=')[1];
        // console.log("Printing URL Token: ", urlToken);
        setToken(urlToken);
    }, []);

    
    useEffect(() => {
        if(token.length > 0){
            verifiedUserEmail();
        }
    }, [token]);

  return (
    <div className="h-full w-full flex flex-col mt-10 mb-7 items-center">
        <RetroGrid />
    {
        isVerified ? 
        (
            <div className="font-bold flex flex-col justify-center items-center">
                <p className="text-5xl tracking-wide">You Are Verified !!</p>
                <div className="flex flex-col justify-center items-center mt-48">
                    <p className="text-3xl text-gray-500 my-auto">Redirecting You to Profile Page</p>
                </div>
            </div>
        ) : 
        (
            <div className="flex flex-col justify-center items-center h-full">
                <p className="text-4xl font-bold">You are Not Verified, Please Retry Again</p>
            </div>
        )
    }
</div>
  )
}

export default VerifyEmailPage