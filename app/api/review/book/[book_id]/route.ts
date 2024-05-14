import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function GET(req: Request,{ params }: { params: { book_id: string }}) {
    try {
        const reviewbook = await prismadb.review_Book.findMany({
            where: { user_id:parseInt(params.book_id) },
            select: {
                id:true,
                title:true,
                describe:true,
                score:true,
                User: {
                    select: {
                        id:true,
                        username:true
                    }
                }
            }
        })

        if (reviewbook.length === 0) {
            return NextResponse.json({
                review:null,
                message: "There is no review on this book yet."
            },{status:200})
        }

        return NextResponse.json({
            review:reviewbook,
            message: "All review of this book have been sent successfully."
        })

    } catch (error) {
                
        console.log(error);
        return NextResponse.json({error})

    }
}



