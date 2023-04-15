// pages/api/ingredient/[ing].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../../supabaseClient';

type Ingredient = {
  name: string;
  // Add other columns as needed
};

export default async function getIngredient(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const ing = req.query.ing;

    const { data, error } = await supabase
    .from('Ingredients')
    .select(`
        name`).eq('name', ing);

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
