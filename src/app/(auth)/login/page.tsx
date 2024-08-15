"use client";

import {z} from "zod";
import { loginSchema } from "@/schemas/loginSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";
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
            const response = await axios.post('/api/v1/login', data);
            console.log("Login Response: ", response);

            toast({
                title: "Login Successful",
            });
            router.push("/api/v1/profile");
        } catch(err){
            console.error("Error in Login of User: ", err);
            toast({
                variant: "destructive",
                title: "Uh oh! Something Went Wrong",
                description: "Error in Login of User",
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
    </div>
  )
}

export default LoginPage;