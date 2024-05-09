import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";
import { upLoadIMG } from "@/utils/supabase";

export async function POST(req: Request) {
    try {
            const formData = await req.formData();

            const date = new Date()

            const categoryIds: number[] = []
            
            const categoryFormData = formData.getAll('category');

            categoryFormData.forEach((id: FormDataEntryValue) => {
                if (typeof id === 'string') {
                    categoryIds.push(parseInt(id));
                }
            });

            let image: string[] = [];
            for await (const [name , value] of formData.entries()){
                if (name === 'image' && value instanceof File) {
                    const imageUrl = await upLoadIMG(value);
                    if (imageUrl) {
                        image.push(imageUrl);
                    }
                }
            }

        const newbook = await prismadb.book.create({
            data : {
                user_id: parseInt(formData.get('user_id') as string),
                title: formData.get('title') as string,
                picture: image,
                description: formData.get('description') as string,
                isPost_trade:true,
                pickup: formData.get('pickup') as string,
                datetime: date.toISOString(),
                req_count:0,
                category: {
                    connect: categoryIds.map(id => ({ id }))
                }
            }
        })

        return NextResponse.json({
            book: newbook,
            message: "Post book successfully"
        },{ status:201 }
    )
    

    } catch (error) {
        console.log(error);

        return NextResponse.json({
            book: null,
            message: "Error",
            error
        },{status:409})
    }
}