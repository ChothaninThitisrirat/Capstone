import { NextResponse } from "next/server"
import { hash } from 'bcrypt';
import { prismadb } from "@/lib/db";
import { supabase } from "@/utils/supabase";

export async function POST(req: Request) {
    try {

        const formdata = await req.formData()

        const username = formdata.get('username') as string
        const email = formdata.get('email') as string
        const password = formdata.get('password') as string
        const first_name = formdata.get('first_name') as string
        const last_name = formdata.get('last_name') as string
        const address = formdata.get('address') as string
        const phone_number = formdata.get('phone_number') as string
        const categoryIds: number[] = []
        const arr_address: string[] = []

        arr_address.push(address)

        const categoryFormData = formdata.getAll('category');

        categoryFormData.forEach((id: FormDataEntryValue) => {
            if (typeof id === 'string') {
                categoryIds.push(parseInt(id));
            }
        });
        
        if (!username || !email || !password || !phone_number || !first_name || !last_name || !address) {
            return NextResponse.json({ user:null, message: 'Must fill all input.'},{status:409})
        }
        
        const phone_numberexist = await prismadb.user.findUnique({
            where: { phone_number:phone_number}
        })

        if (phone_numberexist) {
            return NextResponse.json({ 
                user: null, message: "Phone number already exist."},{status: 409}
            )
        }

        const id = Math.floor(100000 * Math.random())

        const upLoadCardID = async (fileOrBlob: File | Blob | Buffer) => {
            if (!fileOrBlob) {
              throw new Error("No file or blob provided.");
            }
          
            try {
              const fileName = `idcard/${id}.jpg`;
              const filePath = `${fileName}`;
          
              const { error } = await supabase.storage
                .from("b-trade")
                .upload(filePath, fileOrBlob, {
                  cacheControl: "3600"
                });
          
              if (error) {
                throw error;
              }
          
              const { data } = await supabase.storage.from("b-trade").getPublicUrl(filePath);
              return [data.publicUrl];
            } catch (error) {
              console.error("Error uploading file:", error);
              throw error;
            }
          };
        
        const file = formdata.get('card_id')?.valueOf() as Blob | null;

        if (file) {
            const buffer = Buffer.from(await file.arrayBuffer());
            await upLoadCardID(buffer);
        }

        const hashpassword = await hash(password , 5)
        const newUser = await prismadb.user.create({
            data: {
                id,
                username,
                email,
                password:hashpassword,
                first_name,
                last_name,
                address:arr_address,
                phone_number,
            }
        })

        for (let i = 0; i < categoryIds.length; i++) {
            await prismadb.userlike.create({
                data: {
                    user_id: id,
                    category_id: categoryIds[i]
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