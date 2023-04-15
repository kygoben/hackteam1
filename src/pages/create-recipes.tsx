import { SearchIngredients } from '@/components/search-ingredients';
import { useState } from 'react';

const CreateRecipes = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const onSelect = (ingredient: string) => {
    setIngredients((prev) => [...prev, ingredient]);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 text-2xl font-bold">Ingredients</div>
      <ul className="list-disc pl-6 mb-4">
        {ingredients.map((ingredient, index) => {
          return (
            <li key={index} className="mb-2">
              {ingredient}
            </li>
          );
        })}
      </ul>
      <SearchIngredients
        onIngredientSelect={onSelect}
        buttonTitle="Add"
        className="border border-gray-300 rounded p-2"
      />
    </div>
  );
};

export default CreateRecipes;
