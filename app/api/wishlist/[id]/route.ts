import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function GET(req: Request,{ params }: { params: { id: string }}) {
    try {
        const wishlist = await prismadb.wishlist.findMany({
            where: { user_id: parseInt(params.id) },
            select: {
                book_id:true,
                Book:true
            }
        })

        return NextResponse.json({
            wishlist:wishlist,
            message: "Book in wishlist have been sent sucessfully."
        },{ status: 201 }
    )

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error})
        
    }
}