import { useEffect, useState, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

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


  // suggestion_1 fetch suggestion_2
  useEffect(() => {
    fetch(`https://shop.sprwforge.com/api/v1/suggested-products/624951306?page=${page1}`)
      .then((res) => res.json())
      .then((data) => {
        setSuggestion1(data.data.suggestion_1.data || []);
        setSuggestion2(data.data.suggestion_2.data || []);
      });
  }, [page1]);

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
    <div className="mb-10 relative py-4 border-t border-b">
      {/* Title + Page info */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-[18.75px] text-[#333333] font-bold">{title}</h2>
        <p className="text-sm">
          Page {page} of {total}
        </p>
      </div>

       {/* Buttons */}
      <button
        onClick={() => handlePrev(scrollRef, page, setPage)}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10"
      >
        <FaChevronLeft />
      </button>

      <button
        onClick={() => handleNext(scrollRef, page, setPage, total)}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10"
      >
        <FaChevronRight />
      </button>

       {/* Scrollable products */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth hide-scrollbar"
      >
        {products.map((p) => (
          <div
            key={p.id}
            className="min-w-[200px]  p-2 text-center"
          >
            <img
              src={`https://shop.sprwforge.com/uploads/${p.image}`}
              alt={p.title}
              className="h-[200px] w-[200px] mx-auto object-contain"
            />
            <p className="text-[16.5px] text-[#333333] font-bold mt-2 line-clamp-2">{p.title}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-4 space-y-16">
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
