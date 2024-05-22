import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";
// user id / trade id
export async function GET(req: Request,{ params }: { params: { user_id: string , id : string }}) {
    try {
        const myrequest = await prismadb.trade.findUnique({
            where: { id: parseInt(params.id) },
            select: { // trade
                id:true,
                status:true,
                pickup_req:true,
                req_address:true,
                Book_Trade_book_idToBook:{
                    select: { // book ของเรา
                        id:true,
                        title:true,
                        picture:true,
                        address:true,
                        User: {
                            select: {
                                id:true,
                                profile_picture:true,
                                username:true,
                                instagram:true,
                                facebook:true,
                                line:true
                            }
                        }
                    }
                },
                Book_Trade_req_book_idToBook: {
                    select: { // book เขาที่มาขอเทรด
                        id:true,
                        title:true,
                        picture:true,
                        User: {
                            select: {
                                id:true,
                                profile_picture:true,
                                username:true,
                                instagram:true,
                                facebook:true,
                                line:true
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