import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { bddJeune } from "@/lib/types"

export default function jeuneItem(jeune: bddJeune) {

    return (
        <div>
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{jeune.prenom + jeune.nom}</AvatarFallback>
            </Avatar>
        </div>
    )
};
