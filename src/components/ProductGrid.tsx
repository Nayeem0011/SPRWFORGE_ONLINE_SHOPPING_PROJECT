import type { Product } from "../types";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

export default function ProductGrid({ products }: Props) {
  if (!Array.isArray(products) || products.length === 0)
    return <p>No products available</p>;

  return (
    <div className="grid grid-cols-2 xs:grid-cols-2 mdx:grid-cols-3 xxl:grid-cols-5 gap-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
