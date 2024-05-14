import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function GET(req: Request,{ params }: { params: { id: string }}) {
    try {
        const bookinfo = await prismadb.book.findUnique({
            where: { id:parseInt(params.id) },
            select: {
                id:true,
                title:true,
                picture:true,
            }
        })

        return NextResponse.json({
            bookinfo,
            message: "Information about this book have been sent successfully."
        },{ status: 200 }
    )

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error})
        
    }
}