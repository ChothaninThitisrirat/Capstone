import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const { book_id, req_book_id, owner_id, req_user_id, pickup_req } = await req.json()
        
        const date = new Date()

        const checkbook = await prismadb.trade.findMany({
            where: {
              AND: [
                { book_id: book_id },
                { req_book_id: req_book_id },
                { status: 'pending' },
              ],
            },
          });

        if (checkbook.length > 0) {
            return NextResponse.json({
                trade:null,
                message: "User have already request this book."
            },{ status:404}
        )}

        const newtrade_req = await prismadb.trade.create({
            data: {
                book_id,
                req_book_id,
                owner_id,
                req_user_id,
                datetime:date.toISOString(),
                status:'pending',
                pickup_req
            }
        })        

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