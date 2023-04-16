import { RecipeIngredient } from "@/types";
import { Input } from "./Input";
import { useState } from "react";

export type SearchIngredientsProps = {
    onIngredientSelect: (ingredient: RecipeIngredient) => void;
    buttonTitle: string;
};

export const SearchIngredients = ({
    onIngredientSelect,
    buttonTitle
}: SearchIngredientsProps) => {
    const [input, setInput] = useState('');
    const [amount, setAmount] = useState('');
    const handleButtonPress = async () => {
        const response = await fetch(`/api/ingredient/${input}`);
        const data = await response.json();
        
        if (response.status === 200) {
            onIngredientSelect({
              name: data.name,
              amount
            });
            setInput('');
            setAmount('');
        }
    }

    return (
      <div className="flex">
        <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ingredient"/>
        <Input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount"/>
        <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-1/5 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleButtonPress}
        >
            {buttonTitle}
        </button>
      </div>
    );
}
