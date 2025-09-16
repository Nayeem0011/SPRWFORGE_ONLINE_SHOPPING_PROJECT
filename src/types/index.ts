export type Category = {
  id: number;
  title: string;
  slug: string;
};

export type Product = {
  rating: number;
  featured: unknown;
  selling: number;
  id: number;
  title: string;
  description: string;
  overview?: string;
  image: string;
  brand?: {
    id: number;
    title: string;
    name: string;
  };
  category_id?: number;
  current_categories: Category[];
};

// CartItem is just Product + quantity
export interface CartItem extends Product {
  quantity: number;
}
