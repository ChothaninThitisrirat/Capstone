'use client'

import { useState, ChangeEvent } from 'react';
import {  } from '@/utils/supabase';
import { v4 as uuidv4 } from 'uuid';
import { image } from '@/utils/supabase';

export default function Home() {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        console.log(file);
        
        
        return true
    };
    const logo = `${image}line_icon.jpg`
    return (
        <div>
            <h1>Upload File to Supabase Storage</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            <img src={logo} alt="" />
        </div>
    );
}

