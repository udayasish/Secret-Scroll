import {z} from "zod"

export const usernameValidation = z
    .string()
    .min(2, "Minimum character should be 2")
    .max(40, "Maximum length should not exceed 40")
    .regex(/^[a-zA-Z0-9_]+$/, 'Username must not contain special characters');

export const emailValidation = z
    .string()
    .email({message: 'Invalid email address' })

export const passwordValidation = z 
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })

export const signUpSchema = z.object({
    username: usernameValidation,
    email: emailValidation,
    password: passwordValidation
})