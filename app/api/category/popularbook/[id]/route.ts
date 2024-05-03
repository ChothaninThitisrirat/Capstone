import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function GET(req: Request,{ params }: { params: { id: string }}) {
    try {
        const popularbook = await prismadb.category.findMany({
            where: { id: parseInt(params.id)},
            select: {
                name:true,
                book: {
                    select: {
                        title:true,
                        Trade_Trade_book_idToBook:true
                    }
                }
            }
        })
        
        return NextResponse.json(
            popularbook
    )

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error})
        
    }
}