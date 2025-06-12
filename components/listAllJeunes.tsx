'use client'

import { columns } from "./listAllJeunes/column"
import { DataTable } from "./listAllJeunes/data-table"
import { bddJeune } from "@/lib/types"
import SendSMS from "@/components/sendSMS"
import NewJeune from "@/components/newJeune"
import useSWR from "swr"
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { Button } from "./ui/button"
import { PrinterIcon } from "lucide-react"


const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ListAllJeunes() {
    let { data, error, isLoading } = useSWR<bddJeune[]>("/api/v1/jeunes", fetcher);

    const contentRef = useRef<HTMLTableElement>(null);
    const reactToPrintFn = useReactToPrint({
        contentRef: contentRef,
        onAfterPrint: () => console.log("Impression terminée"),
        onPrintError: (error) => console.error("Erreur lors de l'impression:", error),
        pageStyle: "@page { margin: 1cm; }"
    });

    return (
        <div className="container mx-auto px-10">
            {(data != undefined) &&
                <>
                    <div className="flex flex-row">
                        <Button className="w-15 h-15 rounded-full shadow-lg fixed top-7 right-7 bg-green-800 hover:bg-green-600 m-1 hover:cursor-pointer" onClick={reactToPrintFn}>
                            <PrinterIcon className="size-10" strokeWidth={1} />
                        </Button>
                        <SendSMS from={'HEADER'} listSelected={[]} data={data} />
                        <NewJeune />
                    </div>
                    <DataTable columns={columns} data={data} dataJeunes={data} contentRef={contentRef} />
                </>
            }
        </div>
    )
}
