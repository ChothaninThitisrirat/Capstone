import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function GET(req: Request,{ params }: { params: { user_id: string}}) {
    try {
        const addressinfo = await prismadb.user.findUnique({
            where: { id: parseInt(params.user_id) },
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

export async function POST(req: Request) {
    try {
        const { user_id, address  } = await req.json()
        
        const newaddress = await prismadb.user.update({
            where: { id:user_id },
            data: {
                address: {
                    push:address
                }
            }
        })

        return NextResponse.json({
            address: newaddress,
            message: "Update address data successfully."
        },{ status: 200 }
    )

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error})

    }
}