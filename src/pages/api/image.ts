// pages/api/ingredient/[ing].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../supabaseClient';
import { Image } from '@/types';

export default async function image(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {
        const filename: Image = JSON.parse(req.body);
    let link = await supabase
    .storage
    .from('images')
    .getPublicUrl(filename.filename)
    
    supabase
    .from('recipes')
    .update({image: link.data.publicUrl})
    .match({rid: filename.rid});

res.status(200).json({ refs });
  }
}