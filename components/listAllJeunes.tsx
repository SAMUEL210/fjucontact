import { getAllJeunes } from "@/lib/controllers/jeune"
import { columns } from "./listAllJeunes/column"
import { DataTable } from "./listAllJeunes/data-table"
import { bddJeune } from "@/lib/types"
import SendSMS from "@/components/sendSMS"

async function getJeunes(): Promise<bddJeune[]> {
    const AllJeunes = await getAllJeunes()
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

export default async function ListAllJeunes() {
    const data = await getJeunes()
    return (
        <div className="container mx-auto px-10">
            <SendSMS from={'HEADER'} listSelected={[]} data={data} />
            <DataTable columns={columns} data={data} dataJeunes={data} />
        </div>
    )
}
