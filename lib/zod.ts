import { z } from "zod";

export const jeuneSchema = z.object({
    nom: z.string().min(1, { message: 'Veuillez saisir le nom svp!' }),
    prenom: z.string().min(1, { message: 'Veuillez saisir le prénom svp!' }),
    telephone: z.string().min(1, { message: 'Veuillez saisir le téléphone svp!' }),
    email: z.string().email({ message: 'Veuillez saisir un email valide svp!' }),
    idTribu: z.string().min(1, { message: 'Veuillez choisir la tribu svp!' }),
    isDeleted: z.boolean()
});

export const identifianSchema = z.object({
    id: z.string()
})

export const smsSchema = z.object({
    message: z.string().min(1, { message: 'Veuillez saisir le message svp!' })
});