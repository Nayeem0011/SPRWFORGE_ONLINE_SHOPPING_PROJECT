import { useState } from "react";
import type { Category } from "../../types";
import { Link } from "react-router-dom";

interface Props {
  categories: Category[];
  onCategorySelect: (id: number) => void;
  onPriceFilter?: (min: number, max: number) => void;
  onClose: () => void;
}

export default function SidebarModal({
  categories,
  onCategorySelect,
  onPriceFilter,
  onClose,
}: Props & { onClose: () => void }) {
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  const handleGoClick = () => {
    const min = Number(minPrice) || 0;
    const max = Number(maxPrice) || Infinity;
    if (onPriceFilter) onPriceFilter(min, max);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-end justify-center z-50">
      <div className="bg-white w-full rounded-t-2xl shadow-lg p-4 animate-slideUp">
        
        {/* Close button */}
        <div className="flex justify-end mb-4 border-b pb-4 pr-1">
          <button onClick={onClose} className="text-[15px] text-[#470096] font-bold">
            Close
          </button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-5">
          {categories.map((cat) => (
            <Link to={`/category/${cat.slug}`}>
            <button
              key={cat.id}
              onClick={() => onCategorySelect(cat.id)}
              className="px-3 py-1 text-sm rounded-full bg-[#E8F0FE]"
            >
              {cat.title}
            </button>
            </Link>
          ))}
        </div>

        {/* Price */}
        <h3 className="font-bold text-[16px] text-[#333333] mb-2">Price</h3>
        <p className="text-[13px] text-[#111111] mb-2">Any price</p>

        <div className="flex flex-col gap-2">
          <div className="relative">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-gray-700 border-r border-gray-300 pr-2">
              €
            </span>
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full border border-gray-300 rounded-xl px-2 py-2.5 pl-8 text-sm outline-none h-[44px]"
            />
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-gray-700 border-r border-gray-300 pr-2">
                €
              </span>
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full border border-gray-300 rounded-xl px-2 py-2.5 pl-8 text-sm outline-none h-[44px]"
              />
            </div>
            <button
              onClick={handleGoClick}
              className="bg-gradient-to-b from-[#f7f8fa] to-[#e7e9ec] border border-[#bbb] rounded-xl h-[44px] px-5 text-sm shadow-inner hover:from-[#e7e9ec] hover:to-[#f7f8fa]"
            >
              Go
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



