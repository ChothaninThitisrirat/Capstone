import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const { user_id, reviewer_id, score, title, describe } = await req.json()

        const reviewbook = await prismadb.review_User.create({
            data: {
                user_id, 
                reviewer_id, 
                score, 
                title, 
                describe
            }
        })

        return NextResponse.json({
            review:reviewbook,
            message: "Review user sucessfully."
        },{ status:201 })

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error})
        
    }
}