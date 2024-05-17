import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function GET(req: Request,{ params }: { params: { user_id: string }}) {
    try {
        const mybookrequest = await prismadb.book.findMany({
            where: {
                AND:[
                    {
                        user_id:parseInt(params.user_id)
                    },{
                        isPost_trade:true
                    }
                ]
            },
            select: {
                id:true,
                pickup:true,
                address:true,
                picture:true,
                Trade_Trade_book_idToBook:{
                    select:{
                        req_book_id:true
                    },
                    where: {
                        status: 'pending'
                    }
                }
            }
        })

        if (mybookrequest.length == 0) {
            return NextResponse.json({
                myrequest:null,
                message: 'You have not post any trade yet.'
            },{ status: 200 })
        }

        return NextResponse.json({
            mybookrequest:mybookrequest,
            message: "User trade information have been sent successfully"
        },{ status: 200 }
    )

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error})
        
    }
}