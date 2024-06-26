import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function GET(req: Request) {
    try {
        const getCategoryName = await prismadb.category.findMany()

        return NextResponse.json({
            category: getCategoryName,
            message: "Category name have been sent successfully."
        },{ status:200 }
    )

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error})
        
    }
}

