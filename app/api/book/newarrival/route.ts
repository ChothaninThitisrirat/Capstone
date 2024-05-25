import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function GET(req: Request) {
    try {
        const newarrivalbook = await prismadb.book.findMany({
            select: {
                id:true,
                title:true,
                picture:true,
                postdate:true
            },
            take: 20,
            orderBy: [
                {
                    postdate: 'desc'
                }
            ]
        })
        return NextResponse.json({
            newarrivalbook,
            message: "Popular book have been sent successfully."
        },{ status: 200 }
    )

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error})
        
    }
}