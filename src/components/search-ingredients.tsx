import { Input } from "./Input";
import { useState } from "react";

export type SearchIngredientsProps = {
    onIngredientSelect: (ingredient: string) => void;
    buttonTitle: string;
};

export const SearchIngredients = ({
    onIngredientSelect,
    buttonTitle
}: SearchIngredientsProps) => {
    const [input, setInput] = useState('');
    const handleButtonPress = async () => {
        const {status} = await fetch(`/api/ingredient/${input}`);
        
        if (status === 200) {
            onIngredientSelect(input);
            setInput('');
        }
    }

    return (
      <div className="flex">
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleButtonPress}
        >
            {buttonTitle}
        </button>
      </div>
    );
}
