"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { bddJeune } from "@/lib/types"
import { sendSms } from "@/lib/controllers/functions"
import { smsSchema } from "@/lib/zod"

export default function SmsForm({ numTelephones, data }: { numTelephones: string[], data: bddJeune[] }) {

    const form = useForm<z.infer<typeof smsSchema>>({
        resolver: zodResolver(smsSchema),
        defaultValues: {
            message: ''
        }
    })

    async function onSubmit(values: z.infer<typeof smsSchema>) {
        try {
            for (let telephone of numTelephones) {
                const jeune = data.filter((jeune) => jeune.telephone == telephone)[0]
                if (values.message.includes('$$$')) {
                    values.message = values.message.replace('$$$', `${jeune.prenom}`)
                }
                let sms = await sendSms(jeune.telephone, values.message)
                console.log(sms)
            }
            form.reset();
        } catch (error) {
            console.error("Form submission error", error);
        }
    }

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl w-full mx-auto px-2">
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Message du SMS</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Ecrivez votre sms"
                                    className="resize-none h-40"

                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div>
                    <span className="text-muted-foreground text-sm">
                        {`Taille : ${JSON.stringify(form.watch('message')).length - 2} caractères saisis`}
                    </span>
                </div>
                <Button className="bg-green-800 hover:bg-green-600 hover:cursor-pointer" type="submit">Envoyer</Button>
            </form>

        </Form>
    )
}