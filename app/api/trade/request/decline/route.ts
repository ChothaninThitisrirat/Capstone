import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function PUT(req: Request) {
    try {
        const { id } = await req.json()
 
        const date = new Date()

        const decline = await prismadb.trade.update({
            where: { id:id },
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