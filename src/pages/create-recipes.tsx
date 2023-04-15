import { SearchIngredients } from "@/components/search-ingredients";
import { RecipeIngredient } from "@/types";
import { useState } from "react";

const CreateRecipes = () => {
    const [ingredients, setIngredients] = useState<RecipeIngredient[]>([]);
    const onSelect = (ingredient: RecipeIngredient) => {
        setIngredients((prev) => [...prev, ingredient]);
    }

    return (
        <div>
            {ingredients.map(({ingredient, amount}) => {
                return (
                    <div key={ingredient}>{`${ingredient} | ${amount}`}</div>
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
