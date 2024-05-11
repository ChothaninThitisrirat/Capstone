import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function GET(req: Request) {
    try {
        const popularbook = await prismadb.book.findMany({
            select: {
                id:true,
                title:true,
                picture:true,
                User: {
                    select:{
                        username:true
                    }
                }
            },
            take: 5,
            orderBy: {
                req_count: 'desc'
            }
        })
        return NextResponse.json({
            popularbook,
            message: "Popular book have been sent successfully."
        },{ status: 200 }
    )

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error})
        
    }
}