import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";
import { supabase, upLoadPROFILE } from "@/utils/supabaseforsup";

export async function GET(req: Request,{ params }: { params: { user_id: string}}) {
    try {
        const profile_picture = await prismadb.user.findUnique({
            where: { id: parseInt(params.user_id) },
            select: {
                id:true,
                profile_picture:true
            }
        })

        return NextResponse.json({
            profile_picture:profile_picture,
            message: "Profile picture of this user have been sent successfully."
        },{ status: 200 }
    )

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({error})

    }
}

export async function PUT(req: Request) {
    try {
        const formData = await req.formData();
        let image: string | null = null;
    
        const file = formData.get('profile')?.valueOf() as Blob | null;
    
        if (file) {
          const buffer = Buffer.from(await file.arrayBuffer());
          image = await upLoadPROFILE(buffer, file.name, file.type);
        }
            
            const oldpic = await prismadb.user.findUnique({
                where: { id:parseInt(formData.get('id') as string) },
                select: {
                    profile_picture:true
                }
            })

            const filename = oldpic?.profile_picture ? new URL(oldpic.profile_picture).pathname.split('/').pop() : null;

            const path = `profile/${filename}`
            
            if (path && path !== "profile/default-user.jpg") {
                await supabase
                .storage
                .from('b-trade')
                .remove([path])
                console.log(path);
                
            }

            const updatepic = await prismadb.user.update({
                where: { id:parseInt(formData.get('id') as string) },
                data : {
                    profile_picture: image
                }
            })

            return NextResponse.json({
                user: updatepic,
                message: "Update profile picture successfully"
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