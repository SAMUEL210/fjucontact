'use server'

import prisma from '@/lib/prisma'
import { Jeune } from '@/lib/types'

export async function createJeune(values:Jeune){
    try{
        const newJeune = await prisma.jeunes.create({
            data:{
                nom: values.nom?.toLocaleUpperCase(),
                prenom: values.prenom
                    ? values.prenom.charAt(0).toLocaleUpperCase() + values.prenom.slice(1)
                    : "",
                telephone: values.telephone,
                email: values.email,
                idTribu: values.idTribu,
                isDeleted: values.isDeleted
            }
        })
        if(newJeune) return newJeune
        return null
    }catch(e){
        if (e instanceof Error) {
            throw new Error("Une erreur s'est produite : " + e.message)
        } else {
            throw new Error("Une erreur s'est produite : " + String(e))
        }
    }
}

export async function getAllJeunes(){
    try{
        const allJeunes = await prisma.jeunes.findMany({
            where: {
                isDeleted: false
            },
            orderBy:{
                prenom: 'asc'
            }
        })
        if(allJeunes) return allJeunes
        return null
    }catch(e){
        if (e instanceof Error) {
            throw new Error("Une erreur s'est produite : " + e.message)
        } else {
            throw new Error("Une erreur s'est produite : " + String(e))
        }
    }
}

export async function deleteJeune(id:string){
    try{
        const status = await prisma.jeunes.delete({
            where: {
                id:id
            }
        })
        if(status) return status
        return null
    }catch(e){
        if (e instanceof Error) {
            throw new Error("Une erreur s'est produite : " + e.message)
        } else {
            throw new Error("Une erreur s'est produite : " + String(e))
        }
    }
}

export async function updateJeune(id: string, values:Jeune){
    try{
        const newJeune = await prisma.jeunes.update({
            where:{
                id:id
            },
            data:{
                nom: values.nom ? values.nom.toLocaleUpperCase() : "",
                prenom: values.prenom ? values.prenom.charAt(0).toLocaleUpperCase() + values.prenom.slice(1) : "",
                telephone: values.telephone ? values.telephone : "",
                email: values.email ? values.email.toLocaleLowerCase() : "",
                idTribu: values.idTribu ? values.idTribu : "",
                isDeleted: values.isDeleted
            }
        })
        if(newJeune) return newJeune
        return null
    }catch(e){
        if (e instanceof Error) {
            throw new Error("Une erreur s'est produite : " + e.message)
        } else {
            throw new Error("Une erreur s'est produite : " + String(e))
        }
    }
}