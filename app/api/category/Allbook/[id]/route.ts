import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";
import { title } from "process";

export async function GET(req: Request,{ params }: { params: { id: string }}) {
    try {
        const allbook = await prismadb.category.findUnique({
            where: { id: parseInt(params.id) },
            include: {
                book: {
                    select: {
                        id:true,
                        title:true,
                        picture:true
                    }
                }
            }
        })


        return NextResponse.json({
            allbook,
            message: "All book in this category have been sent successfully."
        },{ status: 200 }
    )

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error})

    }
}