import { z } from "zod";


const createBlogPostSchemaValidation = z.object({
    body: z.object({
        user: z.string().min(1, 'User is required'),
        title: z.string().min(1, { message: "Title is required" }),
        category: z.string().min(1, { message: "Category is required" }),
        content: z.string().min(5, { message: "Content must be at least 5 characters long" }),
        thumbnail: z.string().url({ message: "Thumbnail must be a valid URL" }),
    })
})

export const blogValidation = {
    createBlogPostSchemaValidation
}