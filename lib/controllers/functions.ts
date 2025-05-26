'use server'

import axios from 'axios'

export async function sendSms(telephone:string, messageText: string){    
    axios.post('https://textbelt.com/text', {
        phone: telephone,
        message: messageText,
        key: process.env.TEXTBELT_KEY
    }).then(response => {
        if(response.data.success == true){
            return {isSend: true}
        }
        return {isSend: false}
    })
}