import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function GET(req: Request,{ params }: { params: { user_id: string }}) {
    try {
        const userbook = await prismadb.book.findMany({
            where: { user_id: parseInt(params.user_id) },
            select: {
                id:true,
                title:true,
                picture:true
                }
            }
        )

        return NextResponse.json({
                book:userbook,
                message: "Book belong to this user have been sent sucessfully."
        },{ status: 201 }
    )

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error})
        
    }
}