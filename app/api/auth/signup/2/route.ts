import { NextResponse } from "next/server"
import { hash } from 'bcrypt';
import { prismadb } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const { username , email , password , card_id , phone_number , first_name , last_name , address , category} = await req.json()
        
        if (!username || !email || !password || !card_id || !phone_number || !first_name || !last_name || !address) {
            return NextResponse.json({ user:null, message: 'Must fill all input.'},{status:409})
        }
        const card_idexist = await prismadb.user.findUnique({
            where: { card_id: card_id }
        });
        const phone_numberexist = await prismadb.user.findUnique({
            where: { phone_number:phone_number}
        })

        if (card_idexist && phone_numberexist) {
            return NextResponse.json({ 
                user: null, message: "ID Card and Phone number already exist."},{status: 409}
            )
        } else if (card_idexist) {
            return NextResponse.json({ 
                user: null, message: "ID Card already exist."},{status: 409}
            )        
        } else if (phone_numberexist) {
            return NextResponse.json({ 
                user: null, message: "Phone number already exist."},{status: 409}
            )
        }
        const id = Math.floor(10000 * Math.random())
        const hashpassword = await hash(password , 5)
        const newUser = await prismadb.user.create({
            data: {
                id,
                username,
                email,
                password:hashpassword,
                first_name,
                last_name,
                address,
                card_id,
                phone_number,
            }
        })

        for (let i = 0;i < category.length; i++) {
            await prismadb.userlike.create({
                data: {
                    user_id:newUser.id,
                    category_id:category[i]
                }
            })
        }
        return NextResponse.json({
            user:newUser,
            message: "Signup successfully"
        },{ status: 201 }
    )

    } catch (error) {
        console.log(error);
        
        return NextResponse.json({
            user: null,
            message: "Error",
            error
        },{status: 409})
    }
}