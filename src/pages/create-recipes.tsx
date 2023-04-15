import { SearchIngredients } from "@/components/search-ingredients";
import { useState } from "react";

const CreateRecipes = () => {
    const [ingredients, setIngredients] = useState<string[]>([]);
    const onSelect = (ingredient: string) => {
        setIngredients((prev) => [...prev, ingredient]);
    }

    return (
        <div>
            {ingredients.map((ingredient) => {
                return (
                    <div>{ingredient}</div>
                );
            })}
            <SearchIngredients
                onIngredientSelect={onSelect}
                buttonTitle="Add"
            />
        </div>
    );
}

export default CreateRecipes;
