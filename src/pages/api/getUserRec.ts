// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

type Data = {
    recipes?: Recipe[]
}

type Recipe = {
    name: string,
    tags: string[],
    ingredients: string[]
}

type Ingredient = {
    name: string,
    amount: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )

    const uid = req.query.uid;

    const { data: recipesData, error: recipesError } = await supabase
        .from('Recipes')
        .select('*, recipes_tags(*), recipes_ingredients(*)')
        .eq('uid', uid);

    if (recipesError) {
        console.error(recipesError)
        return
    }



    // res.status(200).json({ recipes })
}

