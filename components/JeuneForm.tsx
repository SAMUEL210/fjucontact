"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { PhoneInput } from "@/components/ui/phone-input"
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select"
import { jeuneSchema } from "@/lib/zod"
import { useState } from "react"
import { bddJeune, Tribu } from "@/lib/types"
import useSWR from "swr"

interface JeuneFormProps {
    submitButtonText: string,
    onSubmit: (values: z.infer<typeof jeuneSchema>) => Promise<void>;
    defaultValues: z.infer<typeof jeuneSchema>
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function JeuneForm({ submitButtonText, defaultValues, onSubmit }: JeuneFormProps) {

    let { data, error, isLoading } = useSWR<Tribu[]>("/api/v1/tribus", fetcher);
    console.log("Tribus data: ", data);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useForm<z.infer<typeof jeuneSchema>>({
        resolver: zodResolver(jeuneSchema),
        defaultValues,
    })

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-3xl w-full mx-auto px-4">
                <div className="grid grid-cols-12 gap-4 my-5">
                    <div className="col-span-6">
                        <FormField
                            control={form.control}
                            name="nom"
                            render={({ field }) => (
                                <FormItem className="grid gap-2">
                                    <FormLabel htmlFor="nom">Nom</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="nom"
                                            placeholder="DUPONT"
                                            type="text"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="col-span-6">
                        <FormField
                            control={form.control}
                            name="prenom"
                            render={({ field }) => (
                                <FormItem className="grid gap-2">
                                    <FormLabel htmlFor="prenom">Prénom</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="prenom"
                                            placeholder="Jean Claude"
                                            type="text"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="grid gap-2">
                            <FormLabel htmlFor="email">Adresse mail</FormLabel>
                            <FormControl>
                                <Input
                                    id="email"
                                    placeholder="jc.dupont@exemple.com"
                                    type="email"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="telephone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>N° Téléphone</FormLabel>
                            <FormControl className="w-full">
                                <PhoneInput
                                    {...field}
                                    defaultCountry="FR"
                                    international={true}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-6">
                        <FormField
                            control={form.control}
                            name="idTribu"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Tribu</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Choisir..." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {(data?.map((tribu: Tribu) => (
                                                <SelectItem key={tribu.id} value={tribu.id}>{tribu.nom}</SelectItem>
                                            )))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <Button disabled={isSubmitting}
                    className="w-full bg-green-800 hover:bg-green-600 hover:cursor-pointer" type="submit">{submitButtonText}
                </Button>
            </form>
        </Form >
    )
}