import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const { user_id , title , description , picture , pickup } = await req.json()

        const date = new Date()

        const newBook = await prisma.book.create({
            data: {
                user_id,
                title,
                description,
                picture,
                pickup,
                datetime:date.toISOString(),
                status:"Post trade"
            }
        })
        
        return NextResponse.json({
            book: newBook,
            message: "Post book successfully"
        },{status:201})

    } catch (error) {
        console.log(error);

        return NextResponse.json({
            book: null,
            message: "Error",
            error
        },{status:409})
    }
}