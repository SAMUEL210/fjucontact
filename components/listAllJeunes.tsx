'use client'

import { columns } from "./listAllJeunes/column"
import { DataTable } from "./listAllJeunes/data-table"
import { bddJeune } from "@/lib/types"
import SendSMS from "@/components/sendSMS"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function getJeunes() {
    const { data: AllJeunes, error, isLoading } = useSWR<bddJeune[]>("/api/v1/jeunes", fetcher);
    if (AllJeunes) {
        const JeunesTable: bddJeune[] = []
        for (let unJeune of AllJeunes) {
            const o: bddJeune = {
                id: unJeune.id,
                nom: unJeune.nom ? unJeune.nom.toLocaleUpperCase() : '',
                prenom: unJeune.prenom ? unJeune.prenom.charAt(0).toLocaleUpperCase() + unJeune.prenom.slice(1) : '',
                telephone: unJeune.telephone ? unJeune.telephone : '',
                email: unJeune.email ? unJeune.email.toLocaleLowerCase() : '',
                tribu: unJeune.tribu ? unJeune.tribu : '',
                isDeleted: unJeune.isDeleted
            }
            JeunesTable.push(o);
        }
        return JeunesTable;
    }
    return []
}

export default function ListAllJeunes() {
    const data = getJeunes()
    return (
        <div className="container mx-auto px-10">
            <SendSMS from={'HEADER'} listSelected={[]} data={data} />
            <DataTable columns={columns} data={data} dataJeunes={data} />
        </div>
    )
}
