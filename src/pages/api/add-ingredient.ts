import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {ing, uid} = JSON.parse(req.body);

    if (req.method === 'PUT') {
        const {data, error} = await supabase
            .from('users_ingredients')
            .select()
            .eq('uid', uid);
        if (error) {
            return res.status(500).json({error: error.message});
        }

        return res.status(200).json(data);
    }

    if (req.method !== 'POST')
        return res.status(400).json({error: 'Wrong method :)'});

    const { data: d1, error: e1 } = await supabase
        .from('Ingredients')
        .select()
        .textSearch('name', ing, {
            type: 'websearch',
            config: 'english'
        });

    if (e1) {
        return res.status(500).json({error: e1.message});
    }

    if (d1.length < 1) {
        return res.status(500).json({error: `No ingredients with name ${ing}`});
    }

    const {data: d2, error: e2} = await supabase
        .from('users_ingredients')
        .select()
        .eq('uid', uid)
        .eq('iid', d1[0].name);

    if (e2) {
        return res.status(500).json({error: `Failed to check if ${d1[0].name} was included in user ${uid}`});
    }

    if (d2.length > 0) {
        return res.status(500).json({error: `${d1[0].name} is already included in ${uid}`});
    }

    const {data, error} = await supabase
        .from('users_ingredients')
        .insert([{
            uid,
            iid: d1[0].name
        }])
        .select();

    if (error) {
        return res.status(500).json({error: error.message});
    }

    if (data.length < 1) {
        return res.status(500).json({error: `Failed to insert ingredient ${d1[0].name}`});
    }

    return res.status(200).json({name: data[0].iid});
}
