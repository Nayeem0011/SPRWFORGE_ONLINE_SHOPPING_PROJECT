import type { Product, Category } from "../types";

// Base URL
const BASE_URL = "https://shop.sprwforge.com/api/v1";

// Fetch products with pagination
export async function fetchProducts(page: number) {
  const res = await fetch(`${BASE_URL}/products?page=${page}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json() as Promise<{
    data: {
      result: {
        data: Product[];
        last_page: number;
      };
    };
  }>;
}

// Fetch categories
export async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/products?all_categories=true&sidebar_data=true`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json() as Promise<{
    data: {
      all_categories: Category[];
    };
  }>;
}

// Product Image 
export const IMAGE_BASE_URL = "https://shop.sprwforge.com/uploads/";

// Fetch Products by Category Slug
export const SHOPPAGEAPI = {
  categories: `${BASE_URL}/category`,
  productsByCategory: (slug: string) =>
    `${BASE_URL}/all?category=${slug}&sortby=&shipping=&brand=&collection=&rating=0&max=0&min=0&page=&sidebar_data=false`,
};

// Fetch product by id
export const DETAILS_API = {
  categories: `${BASE_URL}/category`,
  productsByCategory: (slug: string) =>
    `${BASE_URL}/all?category=${slug}&sortby=&shipping=&brand=&collection=&rating=0&max=0&min=0&page=&sidebar_data=false`,
  productDetails: (id: string) => `${BASE_URL}/product/${id}?id=${id}&user_id=`,
};

// suggestion_1 fetch, suggestion_2 fetch
export const DETAILSPAGE_API = {
  suggestedProducts: (productId: string, page: number) =>
    `${BASE_URL}/suggested-products/${productId}?page=${page}`,

  productDetails: (id: string) =>
    `${BASE_URL}/product/${id}?id=${id}&user_id=`,
    
  productsByCategory: (slug: string) =>
    `${BASE_URL}/all?category=${slug}&sortby=&shipping=&brand=&collection=&rating=0&max=0&min=0&page=&sidebar_data=false`,

  categories: () => `${BASE_URL}/category`,
};

// Search
export const SEARCH_PRODUCTS_API = (query: string) =>
  `${BASE_URL}/products?sortby=&shipping=&brand=&collection=&rating=0&max=0&min=0&q=${query}&page=&all_categories=true&sidebar_data=true`;

// Footer
export const GET_COMMON_API = () => `${BASE_URL}/common`;




