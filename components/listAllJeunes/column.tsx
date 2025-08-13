"use client"

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react"
import { ArrowUpDown, TrashIcon, Edit2Icon, DoorOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox"
import { redirect, useRouter } from 'next/navigation'
import { cn } from "@/lib/utils";
import { bddJeune, Tribu } from "@/lib/types";
import useSWR, { mutate } from "swr"
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription, SheetHeader } from "../ui/sheet";
import JeuneForm from "@/components/JeuneForm"
import { updateJeune } from "@/lib/controllers/jeune";
import { useState } from "react";
import { toast } from "sonner";
import { jeuneSchema } from "@/lib/zod";
import z from "zod";

export const columns: ColumnDef<bddJeune>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Tous sélectionner"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                className={cn()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Selectionner ligne"
            />
        ),
    },
    {
        accessorKey: "prenom",
        header: ({ column }) => {
            return (
                <div className="text-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="font-bold"
                    >
                        Prénom
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>

            )
        },
        cell: ({ row }) => {
            const jeune = row.original
            return (
                <Button variant="ghost"
                    onClick={() => redirect("/dashboard/jeunes/" + jeune.id)}
                    className="hover:underline hover:cursor-pointer">
                    {jeune.prenom}
                </Button>
            )
        }
    },
    {
        accessorKey: "nom",
        header: ({ column }) => {
            return (
                <div className="text-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="font-bold"
                    >
                        Nom
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>

            )
        },
        cell: ({ row }) => {
            const jeune = row.original
            return (
                <Button variant="ghost"
                    onClick={() => redirect("/dashboard/jeunes/" + jeune.id)}
                    className="hover:underline hover:cursor-pointer">
                    {jeune.nom}
                </Button>
            )
        }
    },
    {
        accessorKey: "telephone",
        header: () => <div className="text-center font-bold">N° Téléphone</div>
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <div className="text-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="font-bold"
                    >
                        Email
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>

            )
        },
    },
    {
        accessorKey: "idTribu",
        header: () => <div className="text-center font-bold">Tribu</div>,
        cell: ({ row }) => {
            const jeune = row.original
            const fetcher = (url: string) => fetch(url).then((res) => res.json());
            const { data: tribus } = useSWR<Tribu[]>("/api/v1/tribus", fetcher);
            const tribu = tribus?.find((tribu) => tribu.id === jeune.idTribu)
            return (
                <div className="text-center">
                    {tribu ? tribu.nom : "Aucune tribu"}
                </div>
            )
        }
    },
    {
        accessorKey: "actions",
        header: () => <div className="text-center font-bold">Actions</div>,
        cell: ({ row }) => {
            const jeune = row.original
            const [open, setOpen] = useState(false)
            const onSubmit = async (values: z.infer<typeof jeuneSchema>) => {
                try {
                    const updatedJeune = await updateJeune(jeune.id, values)
                    if (updatedJeune) {
                        setOpen(false)
                        mutate("/api/v1/jeunes");
                        toast.success('Jeune modifié!')
                    } else {
                        toast.error("Une erreur s'est produite")
                    }
                } catch (error) {
                    console.error("Form submission error", error);
                }
            }
            return (
                <Sheet open={open} onOpenChange={setOpen}>
                    <DropdownMenu >
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 p-0 w-full text-center">
                                <span className="sr-only text-center">Ouvrir le menu</span>
                                <MoreHorizontal className="h-4 w-4 text-right" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="text-center">
                            <DropdownMenuLabel className="font-bold text-md">Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => redirect("/jeunes/" + jeune.id)}
                                className="text-green-800 focus:text-green-800 focus:bg-green-100 hover:cursor-pointer">
                                <DoorOpen className="text-green-800" />Ouvrir
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <SheetTrigger asChild>
                                <DropdownMenuItem
                                    className="text-orange-400 focus:text-orange-400 focus:bg-orange-100 hover:cursor-pointer">
                                    <Edit2Icon className="text-orange-400" />Modifier
                                </DropdownMenuItem>
                            </SheetTrigger>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={async () => {
                                const response = await fetch("/api/v1/jeunes/delete", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ id: jeune.id })
                                });
                                const responseData = await response.json();

                                if (!response.ok) {
                                    throw new Error(
                                        responseData || "Impossible de modifier la tâche"
                                    );
                                    toast.error("Une erreur s'est produite" + responseData)
                                }
                                if (response.ok) {
                                    toast.success('Jeune supprimé!')
                                }

                                mutate("/api/v1/jeunes");
                            }}
                                className="text-red-500 focus:text-red-500 focus:bg-red-100 hover:cursor-pointer">
                                <TrashIcon className="text-red-500" /> Supprimer
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu >
                    <SheetContent className="w-sm">
                        <SheetHeader>
                            <SheetTitle className="pt-6 text-center capitalize">Modifier Jeune : {jeune.prenom}</SheetTitle>
                            <SheetDescription>
                                Veuillez Vérifier et remplir les champs avant de valider svp!
                            </SheetDescription>
                        </SheetHeader>
                        <JeuneForm
                            submitButtonText="Modidfier"
                            onSubmit={onSubmit}
                            defaultValues={{
                                nom: jeune.nom,
                                prenom: jeune.prenom,
                                telephone: jeune.telephone,
                                email: jeune.email,
                                idTribu: jeune.idTribu,
                                isDeleted: jeune.isDeleted
                            }} />
                    </SheetContent>
                </Sheet>
            )
        },
    }
]
