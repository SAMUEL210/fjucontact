'use client'

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
    MultiSelector, MultiSelectorContent, MultiSelectorInput, MultiSelectorItem, MultiSelectorList, MultiSelectorTrigger
} from "@/components/ui/extension/multi-select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Send } from 'lucide-react'
import SmsForm from "./smsForm"
import { bddJeune, smsSelectedJeuneListing } from "@/lib/types"

export default function SendSMS({ listSelected, data, from }: { listSelected: smsSelectedJeuneListing[], data: bddJeune[], from: string }) {

    let listJeuneSelected: string[] = []
    if (listSelected.length > 0) {
        for (let line of listSelected) {
            listJeuneSelected.push(`${line.original.telephone}`)
        }
    }
    const [value, setValue] = useState<string[]>(listJeuneSelected);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                {(from === 'TABLE' ?
                    (
                        <Button variant="ghost" size="icon" className="text-green-800 hover:bg-green-200 hover:text-green-500 m-1 hover:cursor-pointer">
                            <Send />
                        </Button>
                    ) : (
                        <Button variant="default" className="bg-green-800 hover:bg-green-600 m-1 hover:cursor-pointer">
                            <Send />Envoyer SMS
                        </Button>
                    )
                )}
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="pt-6 text-center capitalize">Envoie SMS</SheetTitle>
                    <SheetDescription>
                        Veuillez Vérifier et remplir les champs avant d'envoyer svp!
                    </SheetDescription>
                </SheetHeader>
                <div className="px-4">
                    <MultiSelector
                        values={value}
                        onValuesChange={setValue}
                        data={data}
                    >
                        <ScrollArea className="h-fit max-h-[150px] border-1 border-black rounded-lg">
                            <MultiSelectorTrigger>
                                <MultiSelectorInput placeholder="Ajouter des jeunes" className="text-sm" />
                            </MultiSelectorTrigger>
                        </ScrollArea>
                        <MultiSelectorContent>
                            <MultiSelectorList>
                                {
                                    (data.map((jeune: bddJeune) => (
                                        <MultiSelectorItem
                                            key={jeune.id}
                                            value={`${jeune.telephone}`}
                                        >{`${jeune.prenom} ${jeune.nom}`}</MultiSelectorItem>
                                    )))
                                }
                            </MultiSelectorList>
                        </MultiSelectorContent>
                    </MultiSelector>
                </div>
                <div className="grid gap-4 py-1 p-4">
                    <SmsForm numTelephones={value} data={data} />
                </div>
            </SheetContent>
        </Sheet >
    )
};
