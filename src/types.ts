export type RecipeIngredient = {
  ingredient: string;
  amount: string;
};

export type Recipe = {
  name: string;
  userId: string;
  isPublic: boolean;
  tags: string[];
  ingredients: RecipeIngredient[];
};

