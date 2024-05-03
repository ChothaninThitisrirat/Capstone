import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const { user_id , title , description , picture , pickup , category } = await req.json()

        const date = new Date()

        const newBook = await prismadb.book.create({
            data: {
                user_id,
                title,
                description,
                picture,
                pickup,
                datetime:date.toISOString(),
                status:"Post trade",
                category:{
                    connect:category    
                }
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