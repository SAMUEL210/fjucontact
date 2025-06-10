'use client'

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'
import JeuneForm from "./JeuneForm"
import { jeuneSchema } from "@/lib/zod"
import { createJeune } from "@/lib/controllers/jeune"
import z from "zod"
import { useState } from "react"
import { toast } from "sonner"
import { mutate } from "swr"

export default function NewJeune() {

    const [open, setOpen] = useState(false)

    const onSubmit = async (values: z.infer<typeof jeuneSchema>) => {
        try {
            const newJeune = await createJeune(values)
            if (newJeune != null) {
                toast.success(`Le jeune ${values.prenom} ${values.nom.toLocaleUpperCase()} à été inscrit!`)
                setOpen(false)
                mutate("/api/v1/jeunes");
            } else {
                toast.error("Jeune non inscrit, une erreur s'est produite")
            }
        } catch (error) {
            console.error("Form submission error", error);
        }
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="default" className="bg-green-800 hover:bg-green-600 m-1 hover:cursor-pointer">
                    <Plus />Nouveau Jeune
                </Button>
            </SheetTrigger>
            <SheetContent className="w-sm">
                <SheetHeader>
                    <SheetTitle className="pt-6 text-center capitalize">Nouveau Jeune</SheetTitle>
                    <SheetDescription>
                        Veuillez Vérifier et remplir les champs avant de valider svp!
                    </SheetDescription>
                </SheetHeader>
                <JeuneForm
                    submitButtonText="Inscrire"
                    onSubmit={onSubmit}
                    defaultValues={{
                        nom: "",
                        prenom: "",
                        telephone: "",
                        email: "",
                        tribu: "",
                        isDeleted: false
                    }} />
            </SheetContent>
        </Sheet >
    )
};
