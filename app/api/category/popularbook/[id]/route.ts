import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function GET(req: Request,{ params }: { params: { id: string }}) {
    try {
        const popularbook = await prismadb.book.findMany({
            where: { isPost_trade:true },
            select: {
                id:true,
                title:true,
                description:true,
                picture:true,
                User: {
                    select:{
                        username:true
                    }
                },
                category: {
                    select:{
                        name:true
                    },
                    where: {
                        id: parseInt(params.id)
                    }
                },
            },
            orderBy: {
                req_count: 'desc'
            },
            take: 5,
        })

        return NextResponse.json({
            popularbook,
            message: "Popular book in this category have been sent successfully."
        },{ status: 200 }
    )

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error})
        
    }
}