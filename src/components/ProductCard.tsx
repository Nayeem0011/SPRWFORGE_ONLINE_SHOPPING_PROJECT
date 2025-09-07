import { TfiReload } from "react-icons/tfi";
import type { Product } from "../types";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="relative cursor-pointer group">
     
       {/* Image */}
      <img
        src={`https://shop.sprwforge.com/uploads/${product.image}`}
        alt={product.title}
        className=" object-cover mb-2"
      />
      
       {/* Reload icon */}
      <div className="absolute top-0 right-1.5 bg-[#F2F5F3] p-2.5 rounded-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        <TfiReload className="text-gray-500 text-[15px]" />
      </div>

       {/* Title */}
      <h3 className="text-[16.5px] font-bold">{product.title}</h3>
    </div>
  );
}
