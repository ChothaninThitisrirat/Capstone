import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function GET(req: Request) {
    try {
        const alluser = await prismadb.user.findMany({
        })
        
        return NextResponse.json({
            user:alluser,
            message: "All user have been sent succesfully"
        },{ status:200} )

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error})
        
    }
} 