'use client'

import { columns } from "./listAllJeunes/column"
import { DataTable } from "./listAllJeunes/data-table"
import { bddJeune } from "@/lib/types"
import SendSMS from "@/components/sendSMS"
import NewJeune from "@/components/newJeune"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ListAllJeunes() {
    let { data, error, isLoading } = useSWR<bddJeune[]>("/api/v1/jeunes", fetcher);

    return (
        <div className="container mx-auto px-10">
            {(data != undefined) &&
                <>
                    <div className="flex flex-row">
                        <SendSMS from={'HEADER'} listSelected={[]} data={data} />
                        <NewJeune />
                    </div>
                    <DataTable columns={columns} data={data} dataJeunes={data} />
                </>
            }
        </div>
    )
}
