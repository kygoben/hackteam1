import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../supabaseClient';
import { Likes } from '@/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const like: Likes = JSON.parse(req.body);

    const {data, error: e1} = await supabase
        .from('Likes')
        .insert([{
            rid: like.rid,
            uid: like.uid,
        }])

        res.status(200).json({ name: 'John Doe' })
}
}
