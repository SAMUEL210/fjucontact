export type Jeune = {
    nom: string | null
    prenom : string | null
    telephone: string | null
    email: string | null
    tribu: string | null
    isDeleted: boolean
}

export type bddJeune = {
    id: string
    nom: string
    prenom: string
    telephone: string
    email: string
    tribu: string
    isDeleted: boolean
}

export type smsSelectedJeuneListing = {
    original: any
    id: string 
}

export type listSelectedJeune = {
    id: string;
}

export type TValue = any;