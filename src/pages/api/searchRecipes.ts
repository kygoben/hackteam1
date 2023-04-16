// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Recipe } from '@/types'
import { RecipeIngredient } from '@/types'
import { supabase } from '../../../supabaseClient'

type Data = {
    recipes?: Recipe[]
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const uid = req.query.uid;
    const searchTerm = req.query.searchTerm;

    const { data, error } = await supabase
        .from('Recipes')
        .select()
        .filter('name', 'ilike', `%${searchTerm}%`)
        .or(`isPublic.eq.TRUE,uid.eq.${uid}`)
        .order('created_at', { ascending: false });

        // uid.eq.${uid}

    console.log(error)

    if (data === null) {
        return res.status(401)
    }

    const recipes = data.map((recipe) => {
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
