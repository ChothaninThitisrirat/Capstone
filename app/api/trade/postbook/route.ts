import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function PUT(req: Request) {
    try {
        const { book_id, pickup, address} = await req.json()

        const date = new Date

        const newbook = await prismadb.book.update({
            where: { id:book_id },
            data : {
                isPost_trade:true,
                pickup,
                address,
                postdate: date.toISOString(),
                req_count:0,  
            }
        })

        return NextResponse.json({
            book: newbook,
            message: "Post book to trade successfully"
        },{ status:201 }
    )
    

    } catch (error) {
        console.log(error);

        return NextResponse.json({
            book: null,
            message: "Error",
            error
        },{status:409})
    }
}