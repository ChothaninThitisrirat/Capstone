import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function GET(req: Request,{ params }: { params: { title: string }}) {
    try {
        const searchbook = await prismadb.book.findMany({
            where: {
                title: {
                    startsWith:params.title,
                    mode: "insensitive"
                },
                isPost_trade: true
            },
            select: {
                id:true,
                title:true
            },
            take:4
        })

        return NextResponse.json({
            book:searchbook
        },{ status: 201 }
    )

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error})
        
    }
}