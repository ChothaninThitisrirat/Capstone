import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function GET(req: Request,{ params }: { params: { user_id: string}}) {
    try {
        const contactinfo = await prismadb.user.findUnique({
            where: { id: parseInt(params.user_id) },
            select: {
                id:true,
                email:true,
                phone_number:true,
                line:true,
                facebook:true,
                instagram:true
            }
        })

        return NextResponse.json({
            contact: contactinfo,
            message: "All contact information of this user have been sent successfully."
        },{ status: 200 }
    )

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error})

    }
}

export async function POST(req: Request) {
    try {
        const { user_id, line, instagram, facebook  } = await req.json()
        
        const updatecontact = await prismadb.user.update({
            where: { id:user_id },
            data: {
                line,
                instagram,
                facebook
            }
        })

        return NextResponse.json({
            contact: updatecontact,
            message: "Update contact data successfully."
        },{ status: 200 }
    )

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error})

    }
}