import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";
import { upLoadIMG, isBlob, isFile, upLoadIMGMAC } from "@/utils/supabase";

export async function POST(req: Request) {
    try {
            const formData = await req.formData();

            const categoryIds: number[] = []
            
            const categoryFormData = formData.getAll('category');

            categoryFormData.forEach((id: FormDataEntryValue) => {
                if (typeof id === 'string') {
                    categoryIds.push(parseInt(id));
                }
            });

            let image: string[] = [];

            // for await (const [name , value] of formData.entries()){
            //     if (name === 'image' && (isBlob(value) || isFile(value))) {
            //         const imageUrl = await upLoadIMG(value);
            //         if (imageUrl) {
            //             image.push(imageUrl);
            //         }
            //     }
            // }

            const files = formData.getAll('image');

                for (const file of files) {
                    if (file instanceof Blob) {
                        const buffer = Buffer.from(await file.arrayBuffer());
                        const imageurl = await upLoadIMGMAC(buffer);
                        image.push(...imageurl);
                    }
            }
            

            const newlibrarybook = await prismadb.book.create({
                data : {
                    user_id: parseInt(formData.get('user_id') as string),
                    title: formData.get('title') as string,
                    picture: image,
                    description: formData.get('description') as string,
                    status: 'available',
                    category: {
                        connect: categoryIds.map(id => ({ id }))
                    }
                }
            })

        return NextResponse.json({
            book: newlibrarybook,
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