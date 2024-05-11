import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function GET(req: Request,{ params }: { params: { user_id: string }}) {
    try {
        const getbook_inlibrary = await prismadb.book.findMany({
            where: {user_id: parseInt(params.user_id)},
            select: {
                id:true,
                title:true,
                picture:true
            }
        })

        return NextResponse.json({
            library:getbook_inlibrary,
            message: "All book of this user have been sent successfully"
        },{ status: 200 }
    )

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error})
        
    }
}