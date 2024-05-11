import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function GET(req: Request,{ params }: { params: { user_id: string }}) {
    try {
        const reviewuser = await prismadb.review_User.findMany({
            where: { user_id:parseInt(params.user_id) },
            select: {
                id:true,
                title:true,
                describe:true,
                score:true,
                User_Review_User_reviewer_idToUser: {
                    select: {
                        id:true,
                        username:true
                    }
                }
            }
        })

        if (reviewuser.length === 0) {
            return NextResponse.json({
                review:null,
                message: "There is no review on this user yet."
            },{status:200})
        }

        return NextResponse.json({
            review:reviewuser,
            message: "All review of this user have been sent successfully."
        })

    } catch (error) {
                
        console.log(error);
        return NextResponse.json({error})

    }
}

