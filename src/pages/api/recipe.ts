// pages/api/recipe.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../supabaseClient';
import { RecipeDatabase } from '@/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const recipe: RecipeDatabase = JSON.parse(req.body);

    const {error} = await supabase
        .from('Recipes')
        .insert([{
            name: recipe.name,
            isPublic: recipe.isPublic,
            tags: recipe.tags,
            ingredientsArr: recipe.ingredients,
            created_at: new Date().toISOString(),
            uid: recipe.uid
        }]);

    console.log(error)

    if (error) {
        res.status(500).json({ error: 'Failed to insert data' });
        return;
    }

    res.status(200).json(recipe);
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
