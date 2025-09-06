import type { Product } from "../types";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="cursor-pointer">
      <img
        src={`https://shop.sprwforge.com/uploads/${product.image}`}
        alt={product.title}
        className=" object-cover mb-2"
      />
      <h3 className="text-[16.5px] font-bold">{product.title}</h3>
    </div>
  );
}
