// pages/api/ingredient/[ing].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../../supabaseClient';

const getIng = (ing: string | string[] | undefined): string => {
    if (Array.isArray(ing)) {
        return ing[0]
    }

    return ing || '';
}

export default async function getIngredient(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const ing: string = getIng(req.query.ing);
    const { data, error } = await supabase
        .from('Ingredients')
        .select()
        .textSearch('name', ing, {
            type: 'websearch',
            config: 'english'
        });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (data && data.length > 0) {
      return res.status(200).json(data[0]);
    } else {
      return res.status(404).json({ error: 'No ingredient found' });
    }
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
