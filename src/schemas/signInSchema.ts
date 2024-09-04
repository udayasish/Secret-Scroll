import {z} from "zod"

export const identifierValidation = z
    .string()
    

export const passwordValidation = z 
    .string()
    

export const signInSchema = z.object({
    identifier: identifierValidation,
    password: passwordValidation
})