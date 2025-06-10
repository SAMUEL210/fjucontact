'use server'

import prisma from "../prisma"
import { smsInfos } from "../types"

export async function createSms(values:smsInfos){
    try{
        const newSms = await prisma.sms.create({
            data:{
                idUser: values.idUser,
                idJeune: values.idJeune,
                message: values.message,
                status: values.status,
            }
        })
        if(newSms) return newSms
        return null
    }catch(e){
        if (e instanceof Error) {
            throw new Error("Une erreur s'est produite : " + e.message)
        } else {
            throw new Error("Une erreur s'est produite : " + String(e))
        }
    }
}