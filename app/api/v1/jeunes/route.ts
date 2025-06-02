import prisma from '@/lib/prisma';
import { jeuneSchema } from '@/lib/zod';
import { NextRequest, NextResponse } from 'next/server';
//import { auth } from "@/lib/auth";
//import { headers } from "next/headers";
 

export async function GET(){
    //const session = await auth.api.getSession({
    //    headers: headers()
    //})
    //if(session != null){
        try {
            const deletedJeune = await prisma.jeunes.findMany({
                where: {
                    isDeleted: false,
                },
                orderBy: {
                    createdAt: 'asc',
                },
            });
            return NextResponse.json(deletedJeune);
        }catch (error){
            console.error('Erreur lors du chargement: ', error);
            return NextResponse.json({message: "Une erreur innattendu s'est produit"}, {status: 500});      
        }
    //}else{
    //    return NextResponse.json({error: 'Veuillez vous identifier!'})
    //}
    
}