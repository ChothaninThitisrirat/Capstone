import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";
// user id เรา book id เรา
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
                title:true,
                Trade_Trade_book_idToBook: {
                    where: {
                        NOT: {
                            status: 'decline'
                        }
                    },
                    select: { // trade
                        id:true,
                        req_book_id:true,
                        status:true,
                        pickup_req:true,
                        req_address:true,
                        isReview:true,
                        Book_Trade_req_book_idToBook: {
                            select: { // book เขาที่มาขอเทรด
                                id:true,
                                title:true,
                                picture:true,
                                status:true, // สถานะของหนังสือ
                                description:true,
                                User: { // ข้อมูลเขา
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