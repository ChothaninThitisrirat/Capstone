import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function GET(req: Request,{ params }: { params: { id: string }}) {
    try {
        const allbookinfo = await prismadb.book.findUnique({
            where: { id: parseInt(params.id)},
            include: {
                User: {
                    include: {
                        Book: {
                            take:6
                        }
                        
                    }
                },
                Review_Book: true,
            } 
        })
        
        return NextResponse.json({
            allbookinfo,
            message: "All about this book infomation have been sent successfully."
        },{ status: 200 }
    )

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error})
        
    }
}