export type RecipeIngredient = {
  name: string;
  amount: string;
};

export type Recipe = {
  name: string;
  isPublic: boolean;
  tags: string[];
  ingredients: RecipeIngredient[];
};

export type RecipeDatabase = Recipe & {
    uid: string;
};

export type Image = {
  rid: string;
  filename: string;
};

