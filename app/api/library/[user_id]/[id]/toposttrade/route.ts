import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function GET(req: Request,{ params }: { params: { id: string }}) {
    try {
        const getbook_info_inlibrary = await prismadb.book.findMany({
            where: { 
                AND:[{
                        id: parseInt(params.id) 
                    },{
                        status:{
                            not: 'trading'
                        }   
                    },{
                        isPost_trade:false
                    }
                ]
            },
            select: {
                id:true,
                title:true,
                picture:true,
                category:true
            },
            
        })

        if (getbook_info_inlibrary.length === 0) {
            return NextResponse.json({
                book:null,
                message: "Invaild user_id or book_id."
            },{ 
                status:404 
            })
        }

        return NextResponse.json({
            book:getbook_info_inlibrary,
            message: "Book in library have been sent to post trade successfully"
        },{ status: 200 }
    )

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error})
        
    }
}