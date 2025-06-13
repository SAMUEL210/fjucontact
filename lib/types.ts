export type Jeune = {
    nom: string | null
    prenom : string | null
    telephone: string | null
    email: string | null
    idTribu: string | null
    isDeleted: boolean
}

export type bddJeune = {
    id: string
    nom: string
    prenom: string
    telephone: string
    email: string
    idTribu: string
    isDeleted: boolean
}

export type smsSelectedJeuneListing = {
    original: any
    id: string 
}

export type listSelectedJeune = {
    id: string;
}

export type smsInfos = {
    idUser: string | null
    idJeune : string
    message: string
    status: string
}

export type Tribu = {
    id: string
    nom: string
    description: string | null
}

export type TValue = any;