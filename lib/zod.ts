import { z } from "zod";

export const identifianSchema = z.object({
    id: z.string()
})


export const smsSchema = z.object({
    message: z.string().min(1, { message: 'Veuillez saisir le message svp!' })
});