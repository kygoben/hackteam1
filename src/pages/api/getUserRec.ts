// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

type Data = {
    recipes?: Recipe[]
}

type Recipe = {
    name: string,
    tags: string[],
    ingredients: Ingredient[]
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
    console.log(uid)

    if(!uid) {
        console.error('no uid')
        return
    }

    // Get initial recipes from uid
    const { data: recipesData, error: recipesError } = await supabase
        .from('Recipes')
        .select('*')
        .eq('uid', uid);

    console.log(`Data: ${JSON.stringify(recipesData)}`)

    let recipes: Recipe[] = [];
    if (recipesData) {
        for (const recipe of recipesData) {
            // Get tags
            const { data: tagData, error: tagError } = await supabase
                .from('recipes_tags')
                .select('tname')
                .eq('rid', recipe.id);

            const recipeTags = tagData?.map((tag) => tag.tname) || [];

            // Get ingredients
            const { data: ingredientData, error: ingredientError } = await supabase
                .from('recipes_ingredients')
                .select('iid, amount')
                .eq('rid', recipe.id);

            const recipeIngredients: Ingredient[] = ingredientData?.map((ingredient) => ({
                name: ingredient.iid,
                amount: ingredient.amount,
            })) || [];


            const formattedRecipe: Recipe = {
                name: recipe.name,
                tags: recipeTags,
                ingredients: recipeIngredients,
            };

            recipes.push(formattedRecipe);
        }

        res.status(200).json({ recipes })
    }
    else {
        res.status(401)
    }



    if (recipesError) {
        console.error(recipesError)
        return
    }

}

