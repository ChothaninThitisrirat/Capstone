import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function GET(req: Request,{ params }: { params: { id: string }}) {
    try {
        const getbook_info_inlibrary = await prismadb.book.findMany({
            where: {
                AND:[{
                    id: parseInt(params.id)
                },
                {
                    in_libary:true
                }
            ]},
            select: {
                id:true,
                title:true,
                picture:true,
                category:true
            }
        })

        return NextResponse.json({
            book:getbook_info_inlibrary,
            message: "Book in library have been sent successfully"
        },{ status: 200 }
    )

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error})
        
    }
}