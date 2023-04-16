import React from "react";
import Image from 'next/image'
import { Recipe } from "@/types";

type RecipeViewProps = {
    recipe: Recipe
  }

function RecipeView({ recipe }: RecipeViewProps) {
  return (
    <div className="bg-white shadow-md rounded-md p-6 flex flex-col gap-4">
      <h2 className="text-2xl font-semibold text-black">{recipe.name}</h2>
      <div className="flex flex-wrap gap-2">
        {recipe.tags.map((tag) => (
          <span
            key={tag}
            className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
      <h3 className="text-lg font-semibold text-black">Ingredients</h3>
      <ul className="list-disc pl-6">
        {recipe.ingredients.map(({ name, amount }, index) => (
          <li key={`${recipe.id}-${index}`} className="text-gray-500">
            {name}: {amount}
          </li>
        ))}
      </ul>
        <img width={100} height={100} src={recipe.img} alt="bruh"></img>
    </div>
  );
}

export default RecipeView;
