import { createBrowserClient } from "@supabase/ssr";
import { v4 as uuid } from "uuid";

const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

export const supabase = createClient()

export const upLoadPROFILE = async (fileOrBlob: File | Blob) => {
    if (!fileOrBlob) {
      throw new Error("No file or blob provided.");
    }
  
    try {
      console.log("Uploading file...", fileOrBlob);
      
      const fileName = `profile/${uuid()}.jpg`;
      const filePath = `${fileName}`;
  
      const { error } = await supabase.storage
        .from("b-trade")
        .upload(filePath, fileOrBlob, {
          cacheControl: "3600",
          contentType: fileOrBlob.type,
        });
  
      if (error) {
        throw error;
      }
  
      const { data } = await supabase.storage.from("b-trade").getPublicUrl(filePath);
      return data.publicUrl;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };