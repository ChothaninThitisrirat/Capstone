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