'use client'

import { useState, ChangeEvent } from 'react';
import { createClient } from '@/utils/supabase';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
    const [file, setFile] = useState<File | null>(null);
    const supabase = createClient()
    const fileName = uuidv4()

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        console.log(file);
        
        const { error } = await supabase.storage.from('attachment').upload(fileName , file);
        if (error) {
            console.error('Error uploading file:', error);
            return false
        }

        const publicURL = await supabase.storage.from('attachment').getPublicUrl(fileName);
        console.log(publicURL);
        
        return true
    };

    return (
        <div>
            <h1>Upload File to Supabase Storage</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
}
