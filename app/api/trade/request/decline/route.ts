import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function PUT(req: Request) {
    try {
        const { book_id, req_book_id, owner_id, req_user_id , id} = await req.json()
 
        const date = new Date()

        const decline = await prismadb.trade.update({
            where: { 
              id_book_id_owner_id_req_user_id_req_book_id: { 
                id,
                book_id,
                req_book_id,
                owner_id,
                req_user_id,
            }},
            data: {
                status: 'decline',
                datetime: date.toISOString()
            }
        })

        if (!decline) {
            return NextResponse.json({
                trade:null,
                message: 'Trade request not found.'
            },{ status: 404 })
        }
              

        return NextResponse.json({
            trade: decline,
            message: "Trade request have been declined."
        },{ status: 200 }
    )

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error})

    }
}