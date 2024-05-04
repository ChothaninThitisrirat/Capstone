import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function GET(req: Request,{ params }: { params: { id: string }}) {
    try {
        const getAllbook = await prismadb.category.findUnique({
            where: { id: parseInt(params.id) },
            include: {
                book:true
            }
        })

        return NextResponse.json({
            getAllbook,
            message: "All book in this category have been sent successfully."
        },{ status: 200 }
    )

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error})

    }
}