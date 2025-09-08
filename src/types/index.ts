export interface Product {
  thumbnail: string;
  id: number;
  title: string;
  slug: string;
  selling: number;
  offered: number;
  image: string;
  review_count: number;
  rating: number;
  price: number | null;
  end_time: string | null;
  category_id?: number;
}

export interface Category {
  id: number;
  title: string;
  slug: string;
  in_footer_child?: Category[];
}
