import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function PUT(req: Request) {
    try {
        const { user_id, first_name, last_name, card_id, address, phone_number, email } = await req.json()
        
        const edituserinfo = await prismadb.user.update({
            where: { id:user_id },
            data: {
                first_name, 
                last_name, 
                card_id, 
                address, 
                phone_number, 
                email 
            }
        })
        
        return NextResponse.json({
            user:edituserinfo,
            message: "Edit user information succesfully"
        },{ status:200} )

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error})
        
    }
} 