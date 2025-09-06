import type { Category } from "../types";

interface Props {
  categories: Category[];
  onCategorySelect: (id: number) => void;
}

export default function Sidebar({ categories, onCategorySelect }: Props) {
  return (
    <div className="lg:w-64 border-r md:w-[220px] pr-3">
      <ul className="mb-6">
        {categories.map((cat) => (
          <li
            key={cat.id}
            className="cursor-pointer py-1 text-[#333333] text-[16px]"
            onClick={() => onCategorySelect(cat.id)}
          >
            {cat.title}
          </li>
        ))}
      </ul>

      {/* Price Section */}
      <div className="mt-6">
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
                className="w-full border border-gray-300 bg-white rounded-xl px-2 py-2.5 pl-8 text-sm outline-none h-[44px]"
              />
            </div>

             {/* Go Button */}
            <button className="bg-gradient-to-b from-[#f7f8fa] rounded-xl to-[#e7e9ec] border border-[#bbb] shadow-inner text-base h-[44px] leading-[42px] px-4 mb-1 
            transition-all duration-100 ease-in-out inline-block no-underline hover:from-[#e7e9ec] hover:to-[#f7f8fa] hover:border-gray-400">
              Go
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
