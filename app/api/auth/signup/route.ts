import { NextResponse } from "next/server"
import { hash } from 'bcrypt';
import { prisma } from "@/lib/db";

export async function Get(req: Request) {
    try {
        const { username , email} = await req.json()
        
        const usernameexist = await prisma.user.findUnique({
            where: { username:username}
        })
        if (usernameexist) {
            return NextResponse.json({ user:null, message: "Username already exist."},{status: 409})
        }

        const emailexist = await prisma.user.findUnique({
            where: { email:email}
        })
        if (emailexist) {
            return NextResponse.json({ user:null, message: "Email already exist."},{status: 409})
        }

        return NextResponse.json({
            user:null
        })
    } catch (error) {
        
        console.log(error);
        
        return NextResponse.json({
            message: "Error",
            error
        },{status: 409})
    }
}

export async function POST(req: Request) {
    try {
        const { username , email , password , card_id , phone_number , first_name , last_name , address } = await req.json()
        
        if (!username || !email || !password || !card_id || !phone_number || !first_name || !last_name || !address) {
            return NextResponse.json({ user:null, message: 'Must fill all input.'},{status:409})
        }

        const card_idexist = await prisma.user.findUnique({
            where: { card_id:card_id}
        })
        if (card_idexist) {
            return NextResponse.json({ user:null, message: "ID Card already exist."},{status: 409})
        }

        const phone_numberexist = await prisma.user.findUnique({
            where: { phone_number:phone_number}
        })
        if (phone_numberexist) {
            return NextResponse.json({ user:null, message: "Phone number already exist."},{status: 409})
        }
        
        const hashpassword = await hash(password , 5)
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password:hashpassword,
                first_name,
                last_name,
                address,
                card_id,
                phone_number
            }
        })

        return NextResponse.json({
            user:newUser,
            message: "Signup successfully"
        },{ status: 201 })


    } catch (error) {
        console.log(error);
        
        return NextResponse.json({
            message: "Error",
            error
        },{status: 409})
    }
}