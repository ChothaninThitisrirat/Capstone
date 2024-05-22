import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function PUT(req: Request) {
    try {
        const { id } = await req.json() // trade id
        
        const date = new Date()

        const accept = await prismadb.trade.update({
            where: { id:id },
            data: {
                status: "trading",
                datetime:date.toISOString()
            }
        })



        if (!accept) {
            return NextResponse.json({
                trade:null,
                message: 'Trade request not found.'
            },{ status: 404 })
        }

        const trading = await prismadb.book.updateMany({
            where: {
                OR:[
                    {id:accept.book_id},
                    {id:accept.req_book_id}
                ]
            },
            data: {
                status: 'trading'
            }
        })
              

        return NextResponse.json({
            trade: accept,
            book: trading,
            message: "Trade request have been accepted."
        },{ status: 200 }
    )

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error})

    }
}