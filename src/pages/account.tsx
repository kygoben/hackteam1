import { useEffect, useState } from "react"
import NavBar from "../../components/NavBar"
import RecipeView from "../../components/RecipeView";
import { useUser } from "@supabase/auth-helpers-react";

interface Recipe {
    id: number;
    name: string;
    tags: string[];
    ingredients: { name: string; amount: string }[];
    created_at: string;
}


export default function Account() {
    const [recipes, setRecipes] = useState<Recipe[]>([])
    const user = useUser()
    const uid = user?.id

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`/api/getUserRec?uid=${uid}`)
                const data = await response.json()
                console.log(data)
                setRecipes(data.recipes)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])


    return (
        <div className="flex flex-col items-center">
            <NavBar />
            <h1 className="text-3xl font-semibold mb-4">Your Recipes</h1>
            <div className="flex flex-col gap-4">
                {recipes.map((recipe) => (
                    <RecipeView key={recipe.id} recipe={recipe} />
                ))}
            </div>
        </div>
    );
}