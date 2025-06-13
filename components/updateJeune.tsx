'use client'

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Edit2Icon, Plus } from 'lucide-react'
import JeuneForm from "./JeuneForm"
import { jeuneSchema } from "@/lib/zod"
import z from "zod"
import { DropdownMenuItem } from "./ui/dropdown-menu"
import { useState } from "react"
import { Jeune } from "@/lib/types"

export default function UpdateJeune({ id }: { id: string }) {

    const [jeune, setJeune] = useState<Jeune>()
    const init = async () => {
        await fetch("/api/todos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: id })
        }).then(async (response) => {
            const data = await response.json();
            setJeune(data);
        })
    }
    init()
    const onSubmit = async (values: z.infer<typeof jeuneSchema>) => {
        try {
            console.log(values)
            // Reset logic can be handled in NewJeuneForm or by passing a ref/callback if needed
        } catch (error) {
            console.error("Form submission error", error);
        }
    }
    return (
        <Sheet>
            <SheetTrigger asChild>
                <DropdownMenuItem
                    className="text-orange-400 focus:text-orange-400 focus:bg-orange-100 hover:cursor-pointer">
                    <Edit2Icon className="text-orange-400" />Modifier
                </DropdownMenuItem>
            </SheetTrigger>
            <SheetContent className="w-sm">
                <SheetHeader>
                    <SheetTitle className="pt-6 text-center capitalize">Nouveau Jeune</SheetTitle>
                    <SheetDescription>
                        Veuillez Vérifier et remplir les champs avant de valider svp!
                    </SheetDescription>
                </SheetHeader>
                <JeuneForm
                    submitButtonText="S'inscrire"
                    onSubmit={onSubmit}
                    defaultValues={{
                        nom: jeune?.nom ?? "",
                        prenom: jeune?.prenom ?? "",
                        telephone: jeune?.telephone ?? "",
                        email: jeune?.email ?? "",
                        idTribu: jeune?.idTribu ?? "",
                        isDeleted: jeune?.isDeleted ?? false
                    }} />
            </SheetContent>
        </Sheet >
    )
};
function method(arg: "/api/todos") {
    throw new Error("Function not implemented.")
}

