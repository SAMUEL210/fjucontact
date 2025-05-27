import prisma from '@/lib/prisma';
import { jeuneSchema } from '@/lib/zod';
import { NextRequest, NextResponse } from 'next/server';
//import { auth } from "@/lib/auth";
//import { headers } from "next/headers";
 
export async function POST( request: NextRequest){
    //const session = await auth.api.getSession({
    //    headers: headers()
    //})
    //if(session != null){
        try{
            const body = await request.json();
            const result = jeuneSchema.safeParse(body);
            
            if(!result.success){
                return NextResponse.json({ message:"Champs invalid", errors: result.error.errors}, {status: 400})
            }
    
            const jeuneData = result.data;
            const newJeune = await prisma.jeunes.create({
                data: {
                    nom: jeuneData.nom.toLocaleUpperCase(),
                    prenom: jeuneData.prenom.charAt(0).toLocaleUpperCase() + jeuneData.prenom.slice(1),
                    telephone: jeuneData.telephone,
                    email: jeuneData.email.toLocaleLowerCase(),
                    tribu: jeuneData.tribu,
                    isDeleted: false
                }
            });
    
            return NextResponse.json(newJeune, {status: 201});
    
        }catch(error){
            console.error('Erreur lors de la creation: ', error);
            return NextResponse.json({message: "Une erreur innattendu s'est produit"}, {status: 500});
        }
    //}else{
    //    return NextResponse.json({error: 'Veuillez vous identifier!'})
    //}
}