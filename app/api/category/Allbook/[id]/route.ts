import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function GET(req: Request,{ params }: { params: { id: string }}) {
    try {
        const getAllbook = await prismadb.category.findUnique({
            where: { id: parseInt(params.id) },
        })

        return NextResponse.json( 
            getAllbook 
    )

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error})

    }
}