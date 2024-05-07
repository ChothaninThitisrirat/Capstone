import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function GET(req: Request,{ params }: { params: { id: string }}) {
    try {
        const popularbook = await prismadb.category.findMany({
            where: { id: parseInt(params.id)},
            select: {
                book: {
                    where: {status: "Post trade"},
                    select: {
                        id:true,
                        title:true,
                        description:true,
                        picture:true,
                        User: {
                            select:{
                                username:true
                            }
                        }
                    },take:5,
                    orderBy: {
                        req_count: "desc"
                    }
                }
            }
        })

        return NextResponse.json({
            popularbook,
            message: "Popular book in this category have been sent successfully."
        },{ status: 200 }
    )

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error})
        
    }
}