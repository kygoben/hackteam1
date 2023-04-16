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
        <div className="p-4 bg-gray-100 min-h-screen">
            <div className="container mx-auto max-w-screen-lg">
                <h1 className="text-4xl font-semibold text-center mb-6">Create Recipe</h1>
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <Input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Recipe Name"
                    />
                    <div className="mb-4">
                        {ingredients.map(({name, amount, tagName}) => {
                            const displayName = name ? name : tagName

                            return (
                                <div key={displayName} className="border-b border-gray-200 py-2">
                                    {`${displayName} | ${amount}`}
                                </div>
                            );
                        })}
                    </div>
                    <SearchIngredients
                        onIngredientSelect={addIngredient}
                        buttonTitle="Add"
                    />
                    <div className="flex items-center mb-4">
                        <label htmlFor='is-public-check' className="mr-2">
                            Is public
                        </label>
                        <Switch
                            id='is-public-check'
                            checked={isPublic}
                            onChange={(_, checked) => setIsPublic(checked)}
                        />
                    </div>
                    <button
                        className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={createRecipe}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateRecipes;