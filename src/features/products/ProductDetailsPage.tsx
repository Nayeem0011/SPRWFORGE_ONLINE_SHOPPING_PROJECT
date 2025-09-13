import { useEffect, useState, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { TfiReload } from "react-icons/tfi";

interface Product {
  id: string;
  title: string;
  image: string;
  selling: string;
  slug: string;
}

export default function ProductDetailsPage() {
  const [suggestion1, setSuggestion1] = useState<Product[]>([]);
  const [suggestion2, setSuggestion2] = useState<Product[]>([]);
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(1);

  const totalPages1 = 61;
  const totalPages2 = 1;

  const scrollRef1 = useRef<HTMLDivElement>(undefined!);
  const scrollRef2 = useRef<HTMLDivElement>(undefined!);

  // suggestion_1 fetch
  useEffect(() => {
    fetch(`https://shop.sprwforge.com/api/v1/suggested-products/624951306?page=${page1}`)
     .then((res) => res.json())
     .then((data) => {
        setSuggestion1(data.data.suggestion_1.data || []);
      });
  }, [page1]);

  // suggestion_2 fetch
  useEffect(() => {
    fetch(`https://shop.sprwforge.com/api/v1/suggested-products/624951306?page=${page2}`)
      .then((res) => res.json())
      .then((data) => {
        setSuggestion2(data.data.suggestion_2.data || []);
      });
    }, [page2]);

  const handlePrev = (
  ref: React.RefObject<HTMLDivElement>,
  page: number,
  setPage: React.Dispatch<React.SetStateAction<number>>
  ) => {
    if (page > 1) {
      setPage(page - 1);
      ref.current?.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const handleNext = (
    ref: React.RefObject<HTMLDivElement>,
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    total: number
  ) => {
    if (page < total) {
      setPage(page + 1);
      ref.current?.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const ProductCarousel = ({
    products,
    title,
    scrollRef,
    page,
    setPage,
    total,
  }: {
    products: Product[];
    title: string;
    scrollRef: React.RefObject<HTMLDivElement>;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    total: number;
  }) => (
    <div className=" relative py-4 border-t">
      {/* Title + Page info */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-[18.75px] text-[#333333] font-bold">{title}</h2>
        <p className="text-[16.5px] font-medium text-[#112211]">
          Page {page} of {total}
        </p>
      </div>

       {/* Buttons */}
      <button
        onClick={() => handlePrev(scrollRef, page, setPage)}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white hover:bg-blue-50 shadow-md p-2 rounded-full z-10"
      >
        <FaChevronLeft />
      </button>

      <button
        onClick={() => handleNext(scrollRef, page, setPage, total)}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white hover:bg-blue-50 shadow-md p-2 rounded-full z-10"
      >
        <FaChevronRight />
      </button>

       {/* Scrollable products */}
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scroll-smooth hide-scrollbar"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="min-w-[232px] p-2"
          >
            <a href={`/product/${product.id}`}  className="relative cursor-pointer group">
               {/* Image */}
              <img
                src={`https://shop.sprwforge.com/uploads/${product.image}`}
                alt={product.title}
                className="w-[214px] h-[214px] mx-auto object-contain"
              />

               {/* Reload icon */}
              <div className="absolute top-0 right-1.5 bg-[#F2F5F3] p-2.5 rounded-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <TfiReload className="text-gray-500 text-[15px]" />
              </div>

               {/* Title */}
              <h3 className="text-[16.5px] text-[#333333] w-[200px] font-bold mt-2 line-clamp-2">{product.title}</h3>
            </a>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-4">
      {suggestion1.length > 0 && (
        <ProductCarousel
          products={suggestion1}
          title="Recommended for you"
          scrollRef={scrollRef1}
          page={page1}
          setPage={setPage1}
          total={totalPages1}
        />
      )}

      {suggestion2.length > 0 && (
        <ProductCarousel
          products={suggestion2}
          title="People who viewed this item also viewed"
          scrollRef={scrollRef2}
          page={page2}
          setPage={setPage2}
          total={totalPages2}
        />
      )}
    </div>
  );
}


