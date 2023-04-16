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
    const { data: d1, error: e1 } = await supabase
        .from('Ingredients')
        .select()
        .textSearch('name', ing, {
            type: 'websearch',
            config: 'english'
        });

    if (e1) {
      return res.status(500).json({ error: e1.message });
    }

    const { data: d2, error: e2 } = await supabase
        .from('ingredientTags')
        .select()
        .textSearch('name', ing, {
            type: 'websearch',
            config: 'english'
        });

    if (e2) {
      return res.status(500).json({ error: e2.message });
    }

    if (d1.length > 0 || d2.length > 0) {
        return res.status(200).json({
            name: d1.length > 0 ? d1[0].name : undefined,
            tagName: d2.length > 0 ? d2[0].name : undefined
        });
    }

    return res.status(404).json({ error: 'No ingredient found' });
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
