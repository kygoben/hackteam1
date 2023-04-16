// pages/api/recipe.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../supabaseClient';
import { RecipeDatabase } from '@/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const recipe: RecipeDatabase = JSON.parse(req.body);

    const {data, error: e1} = await supabase
        .from('Recipes')
        .insert([{
            name: recipe.name,
            isPublic: recipe.isPublic,
            created_at: new Date().toISOString(),
            uid: recipe.uid
        }])
        .select();

    if (e1 || !data) {
        res.status(500).json({ error: 'Failed to insert data' });
        return;
    }

    const id = data[0].id;

    const {error: e2} = await supabase
        .from('recipes_ingredients')
        .insert(recipe.ingredients.map(({name, amount}) => ({
            iid: name,
            rid: id,
            amount // TODO there needs to be itname in here, might be a bit of work actually :(
        })));

    if (e2) {
        res.status(500).json({error: 'Failed to insert ingredients and recipe'});
        return;
    }


    const {error: e3} = await supabase
        .from('recipes_tags')
        .insert(recipe.tags.map(tname => ({
            rid: id,
            tname
        })));

    if (e3) {
        res.status(500).json({error: 'Failed to insert tags and recipe'});
        return;
    }

    res.status(200).json(recipe);
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
