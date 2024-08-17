"use client";
import {z} from "zod";
import { signupSchema } from "@/schemas/signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { ApiResponse } from "@/types/ApiResponse";
import RetroGrid from "@/components/magicui/retro-grid";



const SignupPage = () => {
    const router = useRouter();
    const {toast} = useToast();
    const [loading, setLoading] = useState<boolean>(false);

    // Creating Form using zod implementation
    const form = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        }
    });

    const onSubmit = async(data: z.infer<typeof signupSchema>) => {
        setLoading(true);
        try{
            const response = await axios.post<ApiResponse>('/api/v1/signup', data);
            console.log("Printing Signup Response: ", response);

            toast({
                title: "Signup Successful !!",
                description: "Please Login into your account to Verify Email now !!",
            });

            setTimeout(() => {
                router.replace(`/login`);
            }, 2000);

        } catch(err){
            console.log("Error in Signup of User: ", err);
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

  return (
    <div className="h-full w-full flex flex-col mt-8 mb-7 justify-center items-center">
        {
            loading ? 
            (
                <div className="flex flex-col justify-center items-center h-full">
                    <Loader2 className="mr-2 h-72 w-72 animate-spin" />
                </div>
            ) : 
            (
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-3xl md:text-4xl font-bold my-10">Welcome, SignUp Below</h1>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col justify-center items-center">
                                <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel className="text-xl lg:text-2xl font-semibold tracking-wide">FirstName</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter FirstName" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />

                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel className="text-xl lg:text-2xl font-semibold tracking-wide">LastName</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter LastName" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel className="text-xl lg:text-2xl font-semibold tracking-wide">Email</FormLabel>
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
                                        <FormLabel className="text-xl lg:text-2xl font-semibold tracking-wide">Password</FormLabel>
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

                        <p className="mt-6">OR</p>
                        <p className="text-lg tracking-wider mt-2 text-blue-500 underline cursor-pointer font-semibold"
                            onClick={() => router.push('/login')} >Login Now</p>

                </div>
            )
        }
        <RetroGrid />
    </div>
  )
}

export default SignupPage