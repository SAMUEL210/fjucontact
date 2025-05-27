import prisma from '@/lib/prisma';
import { identifianSchema } from '@/lib/zod';
import { NextRequest, NextResponse } from 'next/server';
//import { auth } from "@/lib/auth";
//import { headers } from "next/headers";
 
export async function POST( request: NextRequest){
    //const session = await auth.api.getSession({
    //    headers: headers()
    //})
    //if(session != null){
        try{
        const body =await request.json();
        const {id} = body;

        if(!id){
            return NextResponse.json({message: "L'id du jeune est requis"}, {status: 404})
        }

        const deleteJeune = await prisma.jeunes.update({
            where: {
                id:id
            },
            data: {
                isDeleted: true,
            }
        })
        if(!deleteJeune){
            return NextResponse.json({message: "Jeune non trouvé"}, {status: 404});
        }

        return  NextResponse.json({ok: 'ok'}, {status: 200});
    
        }catch(error){
            console.error("Erreur lors de suppression du jeune : ", error);
            return NextResponse.json({message: "Une erreur inattendu s'est produite"}, {status: 500});
        }
    //}else{
    //    return NextResponse.json({error: 'Veuillez vous identifier!'})
    //}
}