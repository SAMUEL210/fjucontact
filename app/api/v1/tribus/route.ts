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
            const tribus = await prisma.tribus.findMany({
                where: {
                    isDeleted: false,
                },
                orderBy: {
                    createdAt: 'asc',
                },
            });
            return NextResponse.json(tribus);
        }catch (error){
            console.error('Erreur lors du chargement: ', error);
            return NextResponse.json({message: "Une erreur innattendu s'est produit"}, {status: 500});      
        }
    //}else{
    //    return NextResponse.json({error: 'Veuillez vous identifier!'})
    //}
    
}

export async function POST( request: NextRequest){
    //const session = await auth.api.getSession({
    //    headers: headers()
    //})
    //if(session != null){
        try{
        const body = await request.json();
        const {id} = body;

        if(!id){
            return NextResponse.json({message: "L'id de la tribu est requis"}, {status: 404})
        }

        const tribu = await prisma.tribus.findUnique({
            where: {
                id:id,
                isDeleted: false
            }
        })
        if(!tribu){
            return NextResponse.json({message: "Donnée non valide"}, {status: 404});
        }

        return  NextResponse.json({tribu}, {status: 200});

        }catch(error){
            console.error("Erreur lors de la recherche du jeune : ", error);
            return NextResponse.json({message: "Une erreur inattendu s'est produite"}, {status: 500});
        }
    //}else{
    //    return NextResponse.json({error: 'Veuillez vous identifier!'})
    //}
}