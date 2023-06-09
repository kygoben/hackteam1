export type RecipeIngredient = {
  name?: string;
  amount: string;
  tagName?: string;
};

export type Recipe = {
  id: number;
  name: string;
  isPublic?: boolean;
  tags: string[];
  ingredients: RecipeIngredient[];
  img?: string;
  likes?: number;
};

export type RecipeDatabase = Recipe & {
    uid: string;
};

export type Image = {
  rid: string;
  filename: string;
};

export type Likes = {
  rid: string;
  uid: string;
};
