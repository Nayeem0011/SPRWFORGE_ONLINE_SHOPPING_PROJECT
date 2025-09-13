import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import type { Category } from "../types";
import { FaAnglesLeft } from "react-icons/fa6";
import { useState } from "react";

interface Props {
  categories: Category[];
  onCategorySelect: (id: number) => void;
  activeSlug?: string; // For which category is active
  onPriceFilter?: (min: number, max: number) => void;
}

export default function Sidebar({ categories, onCategorySelect, onPriceFilter }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { slug } = useParams(); // slug to catch

  // Will check that URL "/category/" Start with
  const isCategoryPage = location.pathname.startsWith("/category/");

  // 🔹 Min-Max state
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  const handleGoClick = () => {
    const min = Number(minPrice) || 0;
    const max = Number(maxPrice) || Infinity;
    if (onPriceFilter) onPriceFilter(min, max);
  };

  return (
    <div className="lg:w-64 border-r md:w-[220px] sm:w-[220px] pr-3">
       {/* Categories */}
      <ul className="mb-6">
        {categories.map((cat) => (
          <li key={cat.id} className="py-1 text-[#333333] text-[16px]">
            <Link
              to={`/category/${cat.slug}`}
              className="cursor-pointer"
              onClick={() => onCategorySelect(cat.id)}
            >
              {cat.title}
            </Link>
          </li>
        ))}
      </ul>

       {/* Back Button only on Category Page */}
      {isCategoryPage && (
        <div className="">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-[14px] font-medium pl-2"
          >
            <FaAnglesLeft className="text-[14px] text-gray-500" />
            Go back
          </button>
        </div>
      )}

       {/* Price Section */}
      <div className="mt-6">
        {isCategoryPage && slug && (
          <h3 className="text-[15px] text-[#333333] mb-4 capitalize">
            {slug}
          </h3>
        )}
        <h3 className="font-bold text-[18.75px] text-[#333333] mb-2">Price</h3>
        <p className="text-[13.5px] text-[#111111] mb-2">Any price</p>

        <div className="flex flex-col gap-2">
           {/* Min Input */}
          <div className="relative flex-1 flex-nowrap">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[#111111] text-[13.5px] border-r border-gray-300 pr-2">
              €
            </span>

            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full border border-gray-300 bg-white rounded-xl px-2 py-2.5 pl-8 text-sm outline-none h-[44px]"
            />
          </div>

           {/* Max + Go Row */}
          <div className="flex flex-nowrap gap-2 mt-2">
             {/* Max Input */}
            <div className="relative flex-1">
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[#111111] text-[13.5px] border-r border-gray-300 pr-2">
                €
              </span>

              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full border border-gray-300 bg-white rounded-xl px-2 py-2.5 pl-8 text-sm outline-none h-[44px]"
              />
            </div>

             {/* Go Button */}
            <button 
            onClick={handleGoClick}
            className="bg-gradient-to-b from-[#f7f8fa] rounded-xl to-[#e7e9ec] border border-[#bbb] shadow-inner text-base h-[44px] leading-[42px] px-4 mb-1 
            transition-all duration-100 ease-in-out inline-block no-underline hover:from-[#e7e9ec] hover:to-[#f7f8fa] hover:border-gray-400">
              Go
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



