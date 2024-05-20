import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const { book_id, req_book_id, owner_id, req_user_id, pickup_req, req_address } = await req.json()
        const id = Math.floor(Math.random() * 100000000)


        const date = new Date()

        const checkreq = await prismadb.trade.findMany({
            where: {
              AND: [
                { book_id: book_id },
                { req_book_id: req_book_id },
                { status: 'pending' }
              ],
            },
          });

        if (checkreq.length > 0) {
            return NextResponse.json({
                trade:null,
                message: "User have already request this book."
            },{ status:404}
        )}

        await prismadb.book.update({
            where: { id:book_id },
            data: {
                req_count: +1
            }
        })

        const newtrade_req = await prismadb.trade.create({
            data: {
                id,
                book_id,
                req_book_id,
                owner_id,
                req_user_id,
                datetime:date.toISOString(),
                status:'pending',
                pickup_req,
                req_address
            }
        })      
        
        if (!newtrade_req) {
            return NextResponse.json({
                trade:null,
                message: "Fail to request trade."
            })
        }

        return NextResponse.json({
            trade: newtrade_req,
            message: "Trade request have been sent successfully."
        },{ status: 200 }
    )

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error})

    }
}

export async function GET(req: Request) {
    try {
        const mybookrequest = await prismadb.trade.findMany({})

        return NextResponse.json({
            mybookrequest:mybookrequest,
            message: "All trade information have been sent successfully"
        },{ status: 200 }
    )

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error})
        
    }
}