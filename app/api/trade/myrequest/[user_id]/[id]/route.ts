import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function GET(req: Request,{ params }: { params: { user_id: string , id : string }}) {
    try {
        const myrequest = await prismadb.book.findUnique({
            where: { id: parseInt(params.id) },
            select: {
                id:true,
                title:true,
                picture:true,
                status:true,
                Trade_Trade_req_book_idToBook: {
                    select: {
                        id:true,
                        status:true,
                        req_address:true,
                        pickup_req:true,
                        Book_Trade_book_idToBook: {
                            select: {
                                id:true,
                                title:true,
                                picture:true,
                                status:true
                            }
                        }
                    }
                }
            }
        })


        return NextResponse.json({
            mybookrequest:myrequest,
            message: "Request trade information have been sent successfully"
        },{ status: 200 }
    )

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error})
        
    }
}