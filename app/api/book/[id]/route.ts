import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function GET(req: Request,{ params }: { params: { id: string }}) {
    try {
        const findbook = await prismadb.book.findUnique({
            where: { 
                id: parseInt(params.id),
            },
            select: {
                user_id:true,
                category:true
            }   
        })

        if (!findbook) {
            return NextResponse.json({
                book:null,
                message: "Book not post trade yet."
            }, { status:200 })
        }

        const bookinfo = await prismadb.book.findUnique({
            where: { id: parseInt(params.id) },
            select: {
                id:true,
                title:true,
                description:true,
                picture:true,
                pickup:true,
                address:true,
                postdate:true,
                isPost_trade:true
            }
        })


        const review_book_agg = await prismadb.review_Book.aggregate({
            _avg: {
                score:true
            },
            _count: {
                book_id:true
            },
            where: { book_id: parseInt(params.id) }
        })

        const user = await prismadb.user.findUnique({
            where: { id: findbook?.user_id},
            select: {
                id:true,
                username:true,
                profile_picture:true
            },
        })

        const user_count_book = await prismadb.book.aggregate({
            _count: {
                user_id:true
            },
            where: { user_id:findbook?.user_id }
        })

        const review_user_agg = await prismadb.review_User.aggregate({
            _avg: {
                score:true
            },
            _count: {
                user_id:true
            },
            where: { user_id:findbook?.user_id }
        })

        const otherbook = await prismadb.book.findMany({
            where: { 
                user_id: findbook?.user_id,
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

        const review_book = await prismadb.review_Book.findMany({
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
            count_review_book_agg:review_book_agg._count,
            avg_review_book_agg:review_book_agg._avg,
            category:findbook?.category.map(book => book.name),
            user,
            count_user_book:user_count_book._count,
            avg_user_score:review_user_agg._avg,
            count_user_review:review_user_agg._count,
            review_book,
            otherbook,
            message: "All about this book infomation have been sent successfully."
        },{ status: 200 }
    )

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error})
        
    }
}