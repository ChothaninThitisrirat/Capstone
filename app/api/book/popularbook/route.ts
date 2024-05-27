import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function GET(req: Request) {
    try {
        const popularbook = await prismadb.book.findMany({
            where : { isPost_trade:true },
            select: {
                id:true,
                title:true,
                picture:true,
                description:true,
                User: {
                    select:{
                        id:true,
                        username:true,
                        profile_picture:true
                    }
                }
            },
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