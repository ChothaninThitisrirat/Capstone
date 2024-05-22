import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function GET(req: Request,{ params }: { params: { user_id: string }}) {
    try {
        const ownerbookinfo = await prismadb.book.findUnique({
            where: { id:parseInt(params.user_id) },
            select: {
                id:true,
                title:true,
                picture:true,
                isPost_trade:true,
                User: {
                    select: {
                        id:true,
                        username:true,
                        profile_picture:true
                    }
                }
            }
        })

        return NextResponse.json({
            ownerbookinfo,
            message: "Information about owner of this book have been sent successfully."
        },{ status: 200 }
    )

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error})
        
    }
}