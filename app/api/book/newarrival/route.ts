import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function GET(req: Request) {
    try {
        const newarrivalbook = await prismadb.book.findMany({
            where: { isPost_trade:true },
            select: {
                id:true,
                title:true,
                picture:true,
                postdate:true,
                description:true,
                User: {
                    select: {
                        id:true,
                        username:true,
                        profile_picture:true
                    }
                }
            },
            take: 17,
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