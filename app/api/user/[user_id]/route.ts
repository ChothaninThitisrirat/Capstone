import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

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
            where: { id: parseInt(params.user_id) },
            _avg: {
                score:true
            },
            _count: {
                reviewer_id:true
            }
        })

        return NextResponse.json({
            user: userinfo,
            review_count: review_agg._count,
            review_avg: review_agg._avg,
            message: "All information of this user have been sent successfully."
        },{ status: 200 }
    )

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error})

    }
}