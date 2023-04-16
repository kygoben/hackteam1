// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'
import { Recipe } from '@/types'
import { RecipeIngredient } from '@/types'

type Data = {
    recipes?: Recipe[]
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
    const searchTerm = req.query.searchTerm;

    const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .filter('name', 'ilike', `%${searchTerm}%`)
        .or(`isPublic.eq.TRUE,uid.eq.${uid}`)
        .order('created_at', { ascending: false });

        // uid.eq.${uid}

    console.log(error)

    if (data) {
        res.status(401)
    }

    const recipes = data?.map((recipe) => {
        const ingredients = recipe.ingredientsArr.map(({ name, amount }: { name: string, amount: string }) => ({
            name,
            amount,
        }))

        const { id, name, tags, created_at } = recipe
        return { id, name, tags, created_at, ingredients }
    })

    if (recipes === undefined) {
        res.status(401)
    }

    console.log(JSON.stringify(recipes))

    res.status(200).json({ recipes })

}
