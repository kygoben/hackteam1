// pages/api/recipe.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../supabaseClient';

type Recipe = {
  name: string;
  ingredient_arr: JSON[];
  pub: boolean;
  tags: string[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, ingredient_arr, pub, tags } = req.body as Recipe;

    try {
      const { data, error } = await supabase
        .from('Recipes')
        .insert([{ name, ingredient_arr, pub, tags }]);

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        res.status(201).json(data[0]);
      } else {
        res.status(500).json({ error: 'Failed to insert data' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
