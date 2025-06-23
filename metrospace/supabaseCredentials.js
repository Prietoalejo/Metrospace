import {createClient} from '@supabase/supabase-js';

const supabaseUrl = 'https://dmklovyillgpfidkurwy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRta2xvdnlpbGxncGZpZGt1cnd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NDQxNDgsImV4cCI6MjA2NjIyMDE0OH0.sZZzwGNcBUA-Nt0p88Dhq-W3jA-LvKN59OxMl3uh_Mg';


const supabase = createClient(supabaseUrl, supabaseKey);

export const uploadImage = async (File, bucket,folder) => {
    try {
        const fileExtension = File.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExtension}`;
        const filePath = `${folder}/${fileName}`;
        const {error} = await supabase.storage.from(bucket).upload(filePath, File, {
            cacheControl: '3600',
            upsert: false
        });

        
        const {data:urlData}= supabase.storage.from(bucket).getPublicUrl(filePath);
        return urlData.publicUrl;

    }catch (error){
        console.error('Error uploading image:', error);
        throw error;
    }
    };