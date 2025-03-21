import z from "zod"
export const config = z.object({
    apiUrl: z.string({
        message: "apiUrl is required",
    }),
})

export const env = config.parse({
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
})