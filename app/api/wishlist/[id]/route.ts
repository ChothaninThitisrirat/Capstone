import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function GET(req: Request,{ params }: { params: { id: string }}) {
    try {
        const allwishlist = await prismadb.wishlist.findMany({
            where: { user_id: parseInt(params.id) },
            select: {
                Book: {
                    select: {
                        id:true,
                        title:true,
                        picture:true
                    }
                }
            }
        })

        const book_id = allwishlist.map(async (bookid) => {
            const book = await prismadb.book.findUnique({
                where: { id: bookid.Book.id},
                select: {
                    id:true,
                    title:true,
                    picture:true
                }
            })
            return book
        })

        const allBooks = await Promise.all(book_id);


        return NextResponse.json({
                wishlist:allBooks,
                message: "Book in wishlist have been sent sucessfully."
        },{ status: 201 }
    )

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error})
        
    }
}