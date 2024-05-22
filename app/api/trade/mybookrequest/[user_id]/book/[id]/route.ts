import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function GET(req: Request,{ params }: { params: { user_id: string , id : string }}) {
    try {
        const mybookrequest = await prismadb.book.findUnique({
            where: { id: parseInt(params.id) },
            select: {
                id:true,
                pickup:true,
                picture:true,
                status:true,
                address:true,
                Trade_Trade_book_idToBook: {
                    where: {
                        NOT: {
                            status: 'decline'
                        }
                    },
                    select: {
                        id:true,
                        req_book_id:true,
                        status:true,
                        pickup_req:true,
                        req_address:true,
                        Book_Trade_req_book_idToBook: {
                            select: {
                                id:true,
                                title:true,
                                picture:true,
                                status:true,
                                User: {
                                    select: {
                                        id:true,
                                        username:true,
                                        profile_picture:true,
                                        line:true,
                                        facebook:true,
                                        instagram:true
                                    }
                                }
                            }
                        }
                    }
                },
            }
        })

        if (!mybookrequest) {
            return NextResponse.json({
                myrequest:null,
                message: 'You have not post any trade yet.'
            },{ status: 200 })
        }

        return NextResponse.json({
            mybookrequest:mybookrequest,
            message: "All book that have request trade have been sent successfully"
        },{ status: 200 }
    )

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error})
        
    }
}