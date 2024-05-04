import { NextResponse    } from "next/server";
import { prismadb } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const { username , email} = await req.json()
        
        const usernameexist = await prismadb.user.findUnique({
            where: { username:username}
        })
        const emailexist = await prismadb.user.findUnique({
            where: { email:email}
        })

        if (usernameexist && emailexist) {
            return NextResponse.json({ 
                user: null, message: "Username and Email already exist."},{status: 409}
            )
        } else if (usernameexist) {
            return NextResponse.json({
                user:null, message: "Username already exist."},{status: 409}
            )
        } else if (emailexist) {
            return NextResponse.json({ 
                user:null, message: "Email already exist."},{status: 409}
            )
        }

        return NextResponse.json({
            user:null
        })
    } catch (error) {
        
        console.log(error);
        
        return NextResponse.json({
            message: "Error",
            error
        }, { status: 409 }
    )
    }
}