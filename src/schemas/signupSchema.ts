import {z} from "zod";

export const firstNameValidation = z.string().min(2, "Firstname shall contain atleast 2 characters").max(20, "Firstname should not exceed 20 characters");
export const lastNameValidation = z.string().min(2, "Lastname shall contain atleast 2 characters").max(20, "Lastname should not exceed 20 characters");
export const emailValidation = z.string().email({message: "Invalid Email Address"});
export const passwordValidation = z.string().min(3, "Password should be atleast 3 characters long").max(20, "Password should not exceed more than 20 characters");

export const signupSchema = z.object({
    firstName: firstNameValidation,
    lastName: lastNameValidation, 
    email: emailValidation,
    password: passwordValidation,
});