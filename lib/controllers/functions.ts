'use server'

import axios from 'axios'
import prisma from '../prisma'
import { bddJeune } from '../types'

export async function sendSms(idUser: string, jeune : bddJeune, messageText: string){    
    const sms = axios.post('https://textbelt.com/text', {
        phone: jeune.telephone,
        message: messageText,
        key: process.env.TEXTBELT_KEY
    })
    
    await prisma.sms.create({
        data: {
            idUser: idUser,
            idJeune: jeune.id,
            message: messageText,
            status: (await sms).data.success ? "SENT" : "FAILED",
            createdAt: new Date(),
            updatedAt: new Date()
        }
    })
    return (await sms).data
}