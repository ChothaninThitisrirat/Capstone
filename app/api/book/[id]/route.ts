import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function GET(req: Request,{ params }: { params: { id: string }}) {
    try {
        const user_id = await prismadb.book.findUnique({
            where: { id: parseInt(params.id)},
            select: {
                user_id:true
            }   
        })

        const bookinfo = await prismadb.book.findUnique({
            where: { id: parseInt(params.id) },
            select: {
                id:true,
                user_id:true,
                title:true,
                description:true,
                picture:true,
                pickup:true
            }
        })

        const book_review = await prismadb.review_Book.aggregate({
            _avg: {
                score:true
            },
            _count: {
                book_id:true
            },
            where: { book_id: parseInt(params.id) }
        })

        const avg_book_review = book_review._avg
        const count_book_review = book_review._count

        const user = await prismadb.user.findUnique({
            where: { id: user_id?.user_id},
            select: {
                id:true,
                username:true,
                first_name:true,
                last_name:true,
            },
        })

        const user_book_count = await prismadb.book.aggregate({
            _count: {
                user_id:true
            },
            where: { user_id:user_id?.user_id }
        })

        const review_user = await prismadb.review_User.aggregate({
            _avg: {
                score:true
            },
            _count: {
                user_id:true
            },
            where: { user_id:user_id?.user_id }
        })

        const user_count_book = user_book_count._count
        const avg_user = review_user._avg
        const count_user_review = review_user._count

        const otherbook = await prismadb.book.findMany({
            where: { 
                user_id: user_id?.user_id,
                AND: {
                    NOT: {
                        id: parseInt(params.id)
                    }
                }
            },
            select: {
                id:true,
                title:true,
                picture:true
            }

        })

        const reviewbook = await prismadb.review_Book.findMany({
            where: { book_id: parseInt(params.id) },
            select: {
                title:true,
                describe:true,
                score:true,
                User: {
                    select: {
                        username:true
                    }
                }
            }
        })

        return NextResponse.json({
            bookinfo,
            count_book_review,
            avg_book_review,
            user,
            user_count_book,
            avg_user,
            count_user_review,
            reviewbook,
            otherbook,
            
            message: "All about this book infomation have been sent successfully."
        },{ status: 200 }
    )

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error})
        
    }
}