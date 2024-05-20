import { createBrowserClient } from "@supabase/ssr";
import { v4 as uuid } from "uuid";

const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

export const supabase = createClient()

export const upLoadIMG = async (file: any) => {
  const fileName = "images/" + uuid() + ".jpg"  ;
  const { error } = await supabase.storage
    .from("b-trade")
    .upload(fileName, file, { cacheControl: "image/jpg"});
  if (error) {
    throw error;
  }
  const { data } = await supabase.storage.from("b-trade").getPublicUrl(fileName);
  return data.publicUrl;
  
};


export const upLoadPROFILE = async (file: any) => {
  const fileName = "profile/" + uuid() + ".jpg"  ;
  const { error } = await supabase.storage
    .from("b-trade")
    .upload(fileName, file, { cacheControl: "image/jpg"});
  if (error) {
    throw error;
  }
  const { data } = await supabase.storage.from("b-trade").getPublicUrl(fileName);
  return data.publicUrl;
  
};

export const image = `https://dfmtboqfsygnjttfuvgq.supabase.co/storage/v1/object/public/b-trade/web/`