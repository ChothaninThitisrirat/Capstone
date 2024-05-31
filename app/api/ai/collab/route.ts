import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";

interface Book {
    id: number;
    title: string;
    picture: string[];
    description: string;
    User: {
      id: number;
      username: string;
      profile_picture: string | null;
    };
  }
  
  interface Recommendation {
    [key: string]: Book[];
  }

export async function POST(req: Request) {
    try {
        const { user_id } = await req.json();

        const check_review = await prismadb.review_Book.findMany({
            where: { user_id: parseInt(user_id) }
        }) 

        if (check_review.length === 0) {
            return NextResponse.json({
                recommend:null,
                message: "This user has not reviewed any books yet."
            });
        }

        const response = await fetch(`http://superdoggez.trueddns.com:10612/api/ai-collab`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: parseInt(user_id)
          })
        })

       const recommend: Recommendation = {}
        if (response.ok) {
            const result = await response.json();
            for (let i = 0; i < result.user.length; i++) {
                const books = await prismadb.trade.findMany({
                    where: { req_user_id:result.user[i] },
                    select: {
                        book_id:true,
                        Book_Trade_book_idToBook: {
                            select: {
                                title:true,
                                picture:true,
                                description:true,
                                User: {
                                    select: {
                                        id:true,
                                        username:true,
                                        profile_picture:true
                                    }
                                }
                            }
                        }
                    }
                })
                
                const categoryName = `นวนิยาย`;
                recommend[categoryName] = books.map((book) => ({
                    id: book.book_id,
                    title: book.Book_Trade_book_idToBook.title,
                    picture: book.Book_Trade_book_idToBook.picture,
                    description: book.Book_Trade_book_idToBook.description,
                    User: {
                        id: book.Book_Trade_book_idToBook.User.id,
                        username: book.Book_Trade_book_idToBook.User.username,
                        profile_picture: book.Book_Trade_book_idToBook.User.profile_picture,
                    },
                }));
        }
            return NextResponse.json({recommend});
        }
        
        return NextResponse.json(null);
 
    } catch (error) {
        
        console.log(error);
        return NextResponse.json(error);

    }
}
