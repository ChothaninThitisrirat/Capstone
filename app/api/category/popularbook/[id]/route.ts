import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function GET(req: Request,{ params }: { params: { id: string }}) {
    try {
        const popularbook = await prismadb.category.findMany({
            where: { id: parseInt(params.id)},
            select: {
                name:true,
                book: {
                    take: 5,
                    orderBy: {
                        req_count: 'desc'
                    }
                }
            }
        })
        return NextResponse.json({
            popularbook,
            message: "Popular book in this category sent successfully."
        }
    )

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error})
        
    }
}