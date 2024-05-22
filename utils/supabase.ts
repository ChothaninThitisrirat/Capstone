import { createBrowserClient } from "@supabase/ssr";
import { v4 as uuid } from "uuid";

const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

export const supabase = createClient()

export function isFile(value: any): value is File {
    return value instanceof File;
  }
  
export function isBlob(value: any): value is Blob {
    return value instanceof Blob;
  }

export const upLoadPROFILE = async (fileOrBlob: File | Blob | Buffer) => {
    if (!fileOrBlob) {
      throw new Error("No file or blob provided.");
    }
  
    try {
      const fileName = `profile/${uuid()}.jpg`;
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
      return data.publicUrl;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };


  export const upLoadIMG = async (fileOrBlob: File | Blob | Buffer) => {
    if (!fileOrBlob) {
      throw new Error("No file or blob provided.");
    }
  
    try {
      const fileName = `book/${uuid()}.jpg`;
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


export const image = `https://dfmtboqfsygnjttfuvgq.supabase.co/storage/v1/object/public/b-trade/web/`