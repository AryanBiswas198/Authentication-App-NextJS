"use client";

import { toast } from "@/components/ui/use-toast";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { userAgentFromString } from "next/server";
import { useEffect, useState } from "react";
import SparklesText from "@/components/magicui/sparkles-text";
import RetroGrid from "@/components/magicui/retro-grid";



const ProfilePage = () => {

    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [isVerified, setIsVerified] = useState<boolean>(true);
    const [name, setName] = useState<string>("");

    useEffect(() => {
        const getUserDetails = async() => {
            setLoading(true);
            try{
                const userDetails = await axios.post<ApiResponse>(`/api/v1/profile`);
                console.log("Printing User Details in Profile Page: ", userDetails);

                const user = userDetails.data?.user;

                if (user) {
                    setIsVerified(user?.isVerified);
                    console.log("Printing Is Verified: ", user.isVerified);
                    
                    setName(user.firstName + ' ' + user.lastName);
                    console.log("Printing Name: ", user.firstName + ' ' + user.lastName);
                }

            } catch(err){
                console.log("Error in fetching User Details !!", err);
                const axiosError = err as AxiosError<ApiResponse>;

                let errorMessage = axiosError.response?.data?.message;

                toast({
                    variant: "destructive",
                    title: "Uh oh! Something Went Wrong",
                    description: errorMessage,
                });
            } finally{
                setLoading(false);
            }
        }
        getUserDetails();
    }, [isVerified, []]);

  return (
    <div className="h-full w-full flex flex-col mt-8 mb-7 items-center">
        {
            isVerified ? (<div>You Are Verified</div>) : 
            (
                <div className="flex flex-col justify-center items-center">
                    {/* <h1 className="text-6xl font-bold">Hello {name}</h1> */}
                    <SparklesText text={`Hello ${name}`} className="font-semibold mt-10" />

                    <div className="flex flex-col mt-48 justify-center items-center gap-y-5">
                        <p className="text-gray-600 text-2xl font-semibold">You are currently Not Verified</p>
                        <p className="text-3xl text-gray-500 font-semibold">Please Check Your Email and click on the Link to Verify Your Account !!</p>
                    </div>
                </div>
            )
        }
        <RetroGrid />
    </div>
  )
}

export default ProfilePage