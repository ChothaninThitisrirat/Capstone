import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function GET(req: Request,{ params }: { params: { user_id: string}}) {
    try {
        const phone_number = await prismadb.user.findUnique({
            where: { id: parseInt(params.user_id) },
            select: {
                id:true,
                phone_number:true
            }
        })

        return NextResponse.json({
            phone_number:phone_number,
            message: "Phone number of this user have been sent successfully."
        },{ status: 200 }
    )

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error})

    }
}

export async function PUT(req: Request) {
    try {
            const { user_id, phone_number } = await req.json()
            
            const updatephone = await prismadb.user.update({
                where: { id:user_id },
                data: {
                    phone_number
                }
            })

            return NextResponse.json({
                user: updatephone,
                message: "Update phone number successfully"
            },{ status:201 }
        )

    } catch (error) {
        console.log(error);

        return NextResponse.json({
            book: null,
            message: "Error",
            error
        },{status:409})
    }
}