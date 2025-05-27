"use client"

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox"
import { redirect } from 'next/navigation'
import { deleteJeune } from "@/lib/controllers/jeune";
import { cn } from "@/lib/utils";
import { bddJeune } from "@/lib/types";
import axios from "axios";

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
        header: () => <div className="text-center font-bold">Email</div>
    },
    {
        accessorKey: "tribu",
        header: () => <div className="text-center font-bold">Tribu</div>
    },
    {
        accessorKey: "actions",
        header: () => <div className="text-center font-bold">Actions</div>,
        cell: ({ row }) => {
            const jeune = row.original
            return (
                <DropdownMenu >
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 p-0 w-full text-center">
                            <span className="sr-only text-center">Ouvrir le menu</span>
                            <MoreHorizontal className="h-4 w-4 text-right" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="text-center">
                        <DropdownMenuItem
                            onClick={() => redirect("/dashboard/competitions/" + jeune.id)}
                            className="text-green-800 focus:text-green-800 focus:bg-green-100 hover:cursor-pointer">
                            Ouvrir
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="text-orange-400 focus:text-orange-400 focus:bg-orange-100 hover:cursor-pointer">
                            Modifier
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={async () => {
                            const response = await fetch("/api/v1/jeunes/delete", {
                                method: "PUT",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ id: jeune.id })
                            });
                            const responseData = await response.json();

                            if (!response.ok) {
                                throw new Error(
                                    responseData || "Impossible de modifier la tâche"
                                );
                            }
                            redirect('/')
                        }}
                            className="text-red-500 focus:text-red-500 focus:bg-red-100 hover:cursor-pointer">
                            Supprimer
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu >
            )
        },
    }
]
