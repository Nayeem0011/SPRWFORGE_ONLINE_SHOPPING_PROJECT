export type Category = {
  id: number;
  title: string;
  slug: string;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  overview?: string;
  image: string;
  brand?: {
    id: number;
    title: string;
    name:string
  };
  // New property
  current_categories: Category[];
};
