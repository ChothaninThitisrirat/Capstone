import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function PUT(req: Request) {
    try {
        const { id } = await req.json()
 
        const date = new Date()

        const returnbook = await prismadb.trade.update({
            where: { id:id },
            data: {
                status: 'traded',
                datetime: date.toISOString()
            }
        })

        if (!returnbook) {
            return NextResponse.json({
                trade:null,
                message: 'Trade request not found.'
            },{ status: 404 })
        }
              
        const updatebook = await prismadb.book.updateMany({
            where: { 
                OR: [{
                    id:returnbook.book_id
                },{
                    id:returnbook.req_book_id
                }]
            },
            data: {
                status: 'available'
            }
        })

        return NextResponse.json({
            trade: returnbook,
            book: updatebook,
            message: "Book have been return."
        },{ status: 200 }
    )

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error})

    }
}