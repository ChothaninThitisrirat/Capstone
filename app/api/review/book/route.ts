import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const { book_id, user_id, score, title, describe } = await req.json()

        const reviewbook = await prismadb.review_Book.create({
            data: {
                book_id,
                user_id: parseInt(user_id),
                title,
                describe,
                score
            }
        })

        return NextResponse.json({
            review:reviewbook,
            message: "Review book sucessfully."
        },{ status:201 })

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error})
        
    }
}