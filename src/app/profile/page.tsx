"use client";

import { toast } from "@/components/ui/use-toast";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { userAgentFromString } from "next/server";
import { useEffect, useState } from "react";
import SparklesText from "@/components/magicui/sparkles-text";
import RetroGrid from "@/components/magicui/retro-grid";
import { Loader2 } from "lucide-react";



const ProfilePage = () => {

    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [isVerified, setIsVerified] = useState<boolean>(true);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const logout = async() => {
        setLoading(true);
        try{
            const response = await axios.get<ApiResponse>(`/api/v1/logout`);
            toast({
                title: "Logged Out Successfully",
            });

            router.replace(`/`);
        } catch(err){
            console.log("Error while logging out !!", err);
            const axiosError = err as AxiosError<ApiResponse>;

            const errorMessage = axiosError.response?.data?.message;

            toast({
                variant: "destructive",
                title: "Uh oh! Something Went Wrong",
                description: errorMessage,
            });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const getUserDetails = async() => {
            setLoading(true);
            try{
                const userDetails = await axios.post<ApiResponse>(`/api/v1/profile`);
                // console.log("Printing User Details in Profile Page: ", userDetails);

                const user = userDetails.data?.user;

                if (user) {
                    setIsVerified(user?.isVerified);
                    // console.log("Printing Is Verified: ", user.isVerified);
                    
                    setName(user.firstName + ' ' + user.lastName);
                    // console.log("Printing Name: ", user.firstName + ' ' + user.lastName);

                    setEmail(user?.email);
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
    }, [isVerified]);

  return (
    <div className="h-full w-full flex flex-col mt-8 mb-7 items-center">
        {
            loading ? 
            (
                <div className="flex flex-col justify-center items-center h-full">
                    <Loader2 className="mr-2 h-72 w-72 animate-spin" />
                </div>
            ) : 
            (
                <div className="flex flex-col items-center">
                    <SparklesText text={`Hello ${name}`} className="font-semibold mt-10 text-3xl sm:text-4xl md:text-6xl" />
                    {
                        isVerified ? 
                        (
                            <div className="flex flex-col justify-center items-center">
                                <SparklesText text="You Are Successfully Verified !" className="text-2xl sm:text-3xl md:text-4xl mt-7" />

                                <div className="flex flex-col mt-28 justify-center items-center gap-y-5">
                                    <p className="text-gray-600 text-2xl md:text-3xl font-semibold">Printing User Details Below !!</p>
                                    <p className="text-gray-600 text-2xl md:text-3xl font-semibold">Name: {name}</p>
                                    <p className="text-gray-600 text-2xl md:text-3xl font-semibold">Email: {email}</p>
                                </div>
                            </div>
                        ) : 
                        (
                            <div className="flex flex-col justify-center items-center">
                                <div className="flex flex-col mt-48 justify-center items-center gap-y-5">
                                    <p className="text-gray-600 text-2xl md:text-3xl font-semibold">You are currently Not Verified</p>
                                    <p className="text-2xl md:text-3xl text-gray-500 font-semibold">Please Check Your Email and click on the Link to Verify Your Account !!</p>
                                </div>
                            </div>
                        )
                    }
                    <button onClick={() => logout()} className='bg-black text-white px-7 py-1.5 rounded-full text-xl font-semibold mt-20'>
                        Logout
                    </button>
                </div>
            )
        }
        <RetroGrid />
    </div>
  )
}

export default ProfilePage