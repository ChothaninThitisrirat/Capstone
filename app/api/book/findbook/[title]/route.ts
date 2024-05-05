import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function GET(req: Request,{ params }: { params: { title: string }}) {
    try {
        const findbook = await prismadb.book.findMany({
            where: {
                title: {
                    startsWith:params.title
                }
            },
            select: {
                id:true,
                title:true
            },
            take:5
        })

        return NextResponse.json({
            book:findbook
        },{ status: 201 }
    )

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error})
        
    }
}