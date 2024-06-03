import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function GET(req: Request,{ params }: { params: { user_id: string }}) {
    try {
        const user = await prismadb.user.findUnique({
            where: { 
                id:parseInt(params.user_id)
            },
            select: {
                id: true,
                username:true,
                first_name:true,
                last_name:true,
                address:true,
                phone_number:true,
                email:true,
                profile_picture:true
            }
        })

        if (!user) {
            return NextResponse.json({
                user:user,
                message: "User not found."
            })
        }
        
        return NextResponse.json({
            user:user,
            message: "User information have been sent succesfully"
        },{ status:200} )

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error})
        
    }
} 