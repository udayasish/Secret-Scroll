import {z} from "zod"

export const contentValidation = z
    .string()
    .min(10, { message: 'Content must be at least 10 characters.' })
    .max(500, { message: 'Content must not be longer than 300 characters.' })
    
    

export const messageSchema = z.object({
   content: contentValidation
})