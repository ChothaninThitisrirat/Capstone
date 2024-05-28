import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function GET(req: Request,{ params }: { params: { id: string }}) {
    try {

        const popularbook = await prismadb.category.findUnique({
            where: { id:parseInt(params.id) },
            include: {
                book: {
                    where: { isPost_trade:true },
                    select: {
                        id:true,
                        title:true,
                        description:true,
                        picture:true,
                        User: {
                            select: {
                                id:true,
                                username:true,
                                profile_picture:true
                            }
                        }
                    },
                    orderBy: {
                        req_count: 'desc'
                    },
                    take: 7
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