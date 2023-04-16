// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

type Data = {
    recipes: Recipe[]
}

type Recipe = {
    name: string,
    tags: string[],
    ingredients: Ingredients[]
}

type Ingredients = {
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

    const uid = 'a964d8c9-d9bd-4f79-bd8a-9f2d45fb606a'

    const { data, error } = await supabase
        .from('Recipes')
        .select('*')
        .eq('uid', uid)

    if (error) {
        console.error(error)
        return
    }

    const recipes = data.map((recipe) => {
        const ingredients = recipe.ingredientsArr.map(({ name, amount }: { name: string, amount: string }) => ({
            name,
            amount,
        }))

        const { id, name, tags, created_at } = recipe
        return { id, name, tags, created_at, ingredients }
    })

    res.status(200).json({ recipes })
}

