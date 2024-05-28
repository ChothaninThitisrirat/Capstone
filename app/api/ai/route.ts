import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { user_id } = await req.json();

        const response = await fetch(`http://superdoggez.trueddns.com:10611/api/ai-recommend`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: parseInt(user_id)
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
