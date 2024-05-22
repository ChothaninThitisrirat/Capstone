import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function GET(req: Request,{ params }: { params: { user_id: string }}) {
    try {
        const myrequest = await prismadb.trade.findMany({
            where: { req_user_id:parseInt(params.user_id) },
            select: {
                Book_Trade_book_idToBook: {
                    select: {
                        id:true,
                        title:true,
                        picture:true,
                        status:true
                    }
                },
                id:true,
                status:true
            }
        })

        if (myrequest.length == 0) {
            return NextResponse.json({
                myrequest:null,
                message: 'You have not request any trade yet.'
            },{ status: 200 })
        }

        return NextResponse.json({
            myrequest:myrequest,
            message: "User trade request have been sent successfully"
        },{ status: 200 }
    )

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error})
        
    }
}