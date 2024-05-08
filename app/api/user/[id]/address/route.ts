import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function GET(req: Request,{ params }: { params: { id: string }}) {
    try {
        const addressinfo = await prismadb.user.findUnique({
            where: { id: parseInt(params.id) },
            select: {
                id:true,
                address:true
            }
        })

        return NextResponse.json({
            address: addressinfo,
            message: "All address information of this user have been sent successfully."
        },{ status: 200 }
    )

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error})

    }
}