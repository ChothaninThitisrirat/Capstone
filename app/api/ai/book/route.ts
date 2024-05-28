import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { book_id } = await req.json();

        const response = await fetch(`http://superdoggez.trueddns.com:10611/api/ai-recommend/book`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            book_id: parseInt(book_id)
          })
        })
       
        if (response.ok) {
            const result = await response.json();
            return NextResponse.json(result);
        
        }
        
        return NextResponse.json(null);
 
    } catch (error) {
        
        console.log(error);
        return NextResponse.json(error);

    }
}
