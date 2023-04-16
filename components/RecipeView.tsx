import React from "react";
import { Recipe } from "@/types";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

type RecipeViewProps = {
    recipe: Recipe
  }


  const like = (rid: number, uid: string)=> async () => {

    console.log(rid);
    // console.log(uid);
      const response = await fetch('/api/like', {
          method: 'POST',
          body: JSON.stringify({
              rid,
              uid
          })
      });
      const data = await response.json();
  }

function RecipeView({ recipe }: RecipeViewProps) {
  const user = useUser();
  const router = useRouter();
  if(user===null){
      router.push('/');
    return<div></div>;}
  return (
    <div className="bg-white shadow-md rounded-md p-6 flex flex-col gap-4">
      <h2 className="text-2xl font-semibold text-black">{recipe.name} {recipe.likes}</h2>
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
        console.log(recipe);
        <button className="text-color text-black border-t" onClick={like(recipe.id, user.id)}>Like me</button>
    </div>
  );
}

export default RecipeView;
