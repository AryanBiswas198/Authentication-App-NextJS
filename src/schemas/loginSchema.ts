import {z} from "zod";
import { emailValidation, passwordValidation } from "./signupSchema";

export const loginSchema = z.object({
    email: emailValidation,
    password: passwordValidation,
});