import { Input } from "@/components/Input";
import { SearchIngredients } from "@/components/search-ingredients";
import { RecipeIngredient } from "@/types";
import { Switch } from "@mui/material";
import { useUser } from "@supabase/auth-helpers-react";
import { useState } from "react";

const CreateRecipes = () => {
    const [ingredients, setIngredients] = useState<RecipeIngredient[]>([]);
    const [isPublic, setIsPublic] = useState(false);
    const [name, setName] = useState('');
    const user = useUser();

    const addIngredient = (ingredient: RecipeIngredient) => {
        const inList = ingredients.some((ing) => {
            const list = [ing.name, ing.tagName];
            
            if (ingredient.tagName && list.includes(ingredient.tagName))
                return true;
            if (ingredient.name && list.includes(ingredient.name))
                return true;
            return false;
        });
        
        if (!inList) {
            setIngredients(prev => [...prev, ingredient]);
        }
    }

    const createRecipe = async () => {
        const response = await fetch('/api/recipe', {
            method: 'POST',
            body: JSON.stringify({
                name,
                isPublic,
                ingredients,
                tags: [],
                uid: user?.id
            })
        });

        setIngredients([]);
        setIsPublic(false);
        setName('');
    }

    return (
        <div>
            <Input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Recipe Name"
            />
            <div>
                {ingredients.map(({name, amount, tagName}) => {
                    const displayName = name ? name : tagName

                    return (
                        <div key={displayName}>{`${displayName} | ${amount}`}</div>
                    );
                })}
            </div>
            <SearchIngredients
                onIngredientSelect={addIngredient}
                buttonTitle="Add"
            />
            <label
                htmlFor='is-public-check'
            >
                Is public
            </label>
            <Switch
                id='is-public-check'
                checked={isPublic}
                onChange={(_, checked) => setIsPublic(checked)}
            /><br/>
            <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-1/5 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={createRecipe}
            >
                Submit
            </button>
        </div>
    );
}

export default CreateRecipes;
