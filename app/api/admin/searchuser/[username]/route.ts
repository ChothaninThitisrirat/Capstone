import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function GET(req: Request,{ params }: { params: { username: string }}) {
    try {
        const user = await prismadb.user.findMany({
            where: {
                username: {
                    startsWith: params.username,
                    mode: 'insensitive'
                }
            },
            take:4
        })
        
        return NextResponse.json({
            user:user,
            message: "User information have been sent succesfully"
        },{ status:200} )

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error})
        
    }
} 