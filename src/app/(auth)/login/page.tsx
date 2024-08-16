"use client";

import {z} from "zod";
import { loginSchema } from "@/schemas/loginSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react";
import { ApiResponse } from "@/types/ApiResponse";
import RetroGrid from "@/components/magicui/retro-grid";

const LoginPage = () => {

    const router = useRouter();
    const {toast} = useToast();
    const [loading, setLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit = async(data: z.infer<typeof loginSchema>) => {
        setLoading(true);
        try{
            const response = await axios.post<ApiResponse>('/api/v1/login', data);
            console.log("Login Response: ", response);

            toast({
                title: "Login Successful",
            });

            setTimeout(() => {
                router.push(`/profile`);
            }, 1000);   

        } catch(err){
            console.log("Error in Login of User: ", err);
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

  return (
    <div className="h-full w-full flex flex-col mt-8 mb-7 justify-center items-center">
        <h1 className="text-4xl font-bold my-10">Welcome, Login Below</h1>

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col justify-center items-center">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="text-xl font-semibold tracking-wide">Email</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter Email" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="text-xl font-semibold tracking-wide">Password</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter Password" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                {
                    loading ? 
                        (<Loader2 className="mr-2 h-4 w-4 animate-spin" />) : 
                        (<Button className="w-full mx-auto" type="submit">Submit</Button>)
                }
            </form>
        </Form>

        <p className="mt-8">OR</p>
        <p className="text-lg tracking-wider mt-2 text-blue-500 underline cursor-pointer font-semibold"
            onClick={() => router.push('/signup')} >SignUp Now</p>
        <RetroGrid />
    </div>
  )
}

export default LoginPage;