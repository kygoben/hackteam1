import { useState } from "react";
import RecipeView from "../../components/RecipeView";
import { useUser } from "@supabase/auth-helpers-react";

interface Recipe {
  id: number;
  name: string;
  tags: string[];
  ingredients: { name: string; amount: string }[];
  created_at: string;
}

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const user = useUser();


  const handleSearch = async () => {
    try {
      const uid = user?.id;
      const response = await fetch(`/api/searchRecipes?searchTerm=${searchTerm}&uid=${uid}`);
      const data = await response.json();
      setSearchResults(data.recipes);
      console.log(data)
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <div className="p-4">
        <div className="mb-4">
          <input
            type="text"
            className="border rounded px-2 py-1 text-black"
            placeholder="Search for recipes"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
          <button className="ml-2 px-4 py-1 bg-blue-500 text-white rounded" onClick={handleSearch}>
            Search
          </button>
        </div>
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.map((recipe) => (
              <RecipeView key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
}
