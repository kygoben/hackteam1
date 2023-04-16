export type RecipeIngredient = {
  name: string;
  amount: string;
};

export type Recipe = {
  name: string;
  isPublic: boolean;
  tags: string[];
  ingredients: RecipeIngredient[];
  url: string;
};

export type RecipeDatabase = Recipe & {
    uid: string;
};

export type Image = {
  rid: string;
  filename: string;
};

