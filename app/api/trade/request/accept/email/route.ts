import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";
import { transport, email, acceptedemail } from "@/lib/email";

export async function POST(req: Request) {
    try {
        const { id } = await req.json()
        
        const tradeinfo = await prismadb.trade.findUnique({
            where: { 
                id:id,
                status: 'pending'
            },
            include: {
                User_Trade_owner_idToUser:true,
                Book_Trade_req_book_idToBook:true,
                Book_Trade_book_idToBook:true,
                User:true
            }
        })

        if (!tradeinfo) {
            return NextResponse.json({
                email:null,
                message: "Trade info not found."
            })
        }
        
        await transport.verify()
                
        const send = await transport.sendMail({
            from: email.email,
            to: `${tradeinfo?.User.email}`,
            subject: `Trade: ${tradeinfo?.id}`,
            html: acceptedemail(`${tradeinfo?.Book_Trade_book_idToBook.title}`, `${tradeinfo?.Book_Trade_req_book_idToBook.title}`, `${tradeinfo?.User_Trade_owner_idToUser.username}`, `${tradeinfo?.User.username}`)
        })

        return NextResponse.json({
            email:send,
            message: "Accept email has been sent successfully."
        })

    } catch (error) {
        
        console.log(error);
        return NextResponse.json(error)

    }
}