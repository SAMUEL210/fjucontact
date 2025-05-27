import prisma from '@/lib/prisma';
import { identifianSchema } from '@/lib/zod';
import { NextRequest, NextResponse } from 'next/server';
//import { auth } from "@/lib/auth";
import { headers } from "next/headers";
 
export async function POST( request: NextRequest){
    //const session = await auth.api.getSession({
    //    headers: headers()
    //})
    //if(session != null){
        try{
            const body = await request.json();
            const result = identifianSchema.safeParse(body);
            
            if(!result.success){
                return NextResponse.json({ message:"invalid!", errors: result.error.errors}, {status: 400})
            }
    
            const id = result.data.id;
            const etat = await prisma.jeunes.delete({
                where:{
                    id:id
                }
            });
    
            return NextResponse.json(etat, {status: 201});
    
        }catch(error){
            console.error('Erreur lors de la creation: ', error);
            return NextResponse.json({message: "Une erreur innattendu s'est produit"}, {status: 500});
        }
    //}else{
    //    return NextResponse.json({error: 'Veuillez vous identifier!'})
    //}
}

export async function DELETE(request: NextRequest){
    //const session = await auth.api.getSession({
    //    headers: headers()
    //})
    //if(session != null){
        try{
            const id = request.nextUrl.searchParams.get('id');
            if(!id){
                return NextResponse.json({message: "Id est requise!"}, {status: 400});
            }

            const deleteTodo = await prisma.jeunes.delete({
                where: {id},
            });

            if(!deleteTodo){
                return NextResponse.json({message: "Tâche non trouvé"}, {status: 404});
            }

            return NextResponse.json({message: "Supprimé avec succès"}, {status: 200});

        }catch(error){
            console.error("Erreur lors de la suppression : ", error);
            return NextResponse.json({message: "Une erreur inattendu s'est produite"}, {status: 500});
        }
    //}else{
    //    return NextResponse.json({error: 'Veuillez vous identifier!'})
    //}
}

export async function PUT(request: NextRequest) {
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

        const updateTodo = await prisma.jeunes.update({
            where: {
                id:id
            },
            data: {
                isDeleted: true,
            }
        })
        if(!updateTodo){
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