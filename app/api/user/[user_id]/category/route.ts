import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function PUT(req: Request) {
    try {
        const { user_id, category } = await req.json()

        await prismadb.userlike.deleteMany({
            where: { user_id:user_id }
        })

        for (let i = 0;i < category.length; i++) {
            await prismadb.userlike.create({
                data: {
                    user_id:user_id,
                    category_id:category[i]
                }
            })
        }

    } catch (error) {
        
        console.log(error);
        return NextResponse.json(error)

    }
}

export async function GET(req: Request ,{ params }: { params: { user_id: string }}) {
    try {
        const user_cat = await prismadb.userlike.findMany({
            where: { user_id:parseInt(params.user_id) },
            include: {
                Category:true
            }
        })

        if (!user_cat) {
            return NextResponse.json({
                category:null,
                message: "Invalid user id."
            })
        }

        return NextResponse.json({
            category:user_cat,
            message: "Category that user like have been sent successfully."
        })
    } catch (error) {
        
        console.log(error);
        return NextResponse.json(error)   

    }
    
}