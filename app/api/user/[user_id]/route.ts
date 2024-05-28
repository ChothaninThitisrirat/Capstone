import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";
import { Decimal } from "@prisma/client/runtime/library";

export async function GET(req: Request,{ params }: { params: { user_id: string }}) {
    try {
        const userinfo = await prismadb.user.findUnique({
            where: { id: parseInt(params.user_id) },
            select: {
                id:true,
                username:true,
                email:true,
                first_name:true,
                last_name:true,
                profile_picture:true,
                phone_number:true,
                card_id:true,
                instagram:true,
                facebook:true,
                line:true,
                address:true
            }
        })

        const review_agg = await prismadb.review_User.aggregate({
            where: { user_id: parseInt(params.user_id) },
            _avg: {
                score:true
            },
            _count: {
                reviewer_id:true
            }
        })

        const book_agg = await prismadb.book.aggregate({
            where: { id: parseInt(params.user_id),isPost_trade:true },
            _count: {
                id:true
            }
        })

        let avg_user = 0

        if (review_agg._avg.score !== null) {
            const avg = review_agg._avg.score as Decimal
            avg_user = Math.round(avg.toNumber() * 100) / 100
        }

        
        return NextResponse.json({
            user: userinfo,
            review_count: review_agg._count,
            review_avg: avg_user,
            book_count: book_agg._count,
            message: "All information of this user has been sent successfully."
        },{ status: 200 }
    )

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error})

    }
}