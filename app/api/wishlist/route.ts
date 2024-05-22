import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const { user_id , book_id } = await req.json()

        const existWishlist = await prismadb.wishlist.findFirst({
            where: { 
                user_id:parseInt(user_id),
                book_id:book_id
            }
        })

        if (existWishlist) {
            const deleteWishlist = await prismadb.wishlist.deleteMany({
                where: { 
                    user_id:parseInt(user_id),
                    book_id:book_id
                }
            })
            
            return NextResponse.json({
                user:deleteWishlist,
                message: "Delete from wishlist"
            }, { status:201 })
        }



        const addWishlist = await prismadb.wishlist.create({
            data: {
                    user_id:parseInt(user_id),
                    book_id
            }
        })

        return NextResponse.json({
            wishlist:addWishlist,
            message: "Book added to wishlist sucessfully."
        },{ status: 201 }
    )

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error})
        
    }
}