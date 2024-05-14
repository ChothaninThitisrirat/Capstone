import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function DELETE(req: Request) {
    try {
        const { user_id} = await req.json()
        
        const edituserinfo = await prismadb.user.delete({
            where: { id:user_id }
        })
        
        return NextResponse.json({
            user:edituserinfo,
            message: "Delete user succesfully"
        },{ status:200} )

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error})
        
    }
} 